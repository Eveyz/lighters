/* 
 * @author: znz
*/

const express = require('express');
const path = require('path');
const router = express.Router();
const Course = require('../models/course');
const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Report = require('../models/report');
const jwt = require('jsonwebtoken');
const config = require('../config');
const utils = require('../utils');
const mongoose = require('mongoose');
const authenticate = require('../middlewares/authenticate');

/* Get Courses */
router.get('/', utils.verifyAdmin, async (req, res) => {
  // console.log(req.currentUser);
  var _query = req.query;
  
  try {
    if(req.query.teacher_id) {
      // get courses data
      _query = {
        "teachers": {"$in": [req.query.teacher_id]}
      };
      
      const courses = await Course.find(_query)
        .populate('books')
        .populate('teachers', 'lastname firstname englishname')
        .populate('students', 'lastname firstname englishname');
      
      const response = [];
      const countPromises = courses.map(async (course) => {
        const _count = await Report.find({course_id: course._id}).countDocuments();
        course._doc["count"] = _count;
        response.push(course);
        return _count;
      });
      
      await Promise.all(countPromises);
      res.json(response);
      
    } else if(req.query.field) {
      // query courses grouping by field
      const field = req.query.field;
      const grouped_active_courses = {};
      const grouped_inactive_courses = {};
      
      const courses = await Course.find({})
        .populate('books')
        .populate('teachers', 'lastname firstname englishname')
        .populate('students', 'lastname firstname englishname');
      
      courses.forEach(course => {
        let grouped_courses = course["status"] === "active" ? grouped_active_courses : grouped_inactive_courses;
        if(!(course[field] in grouped_courses)) {
          grouped_courses[course[field]] = [];
        }
        grouped_courses[course[field]].push(course);
      });
      
      res.json({
        active: grouped_active_courses,
        inactive: grouped_inactive_courses
      });
      
    } else {
      const courses = await Course.find(_query)
        .populate('books')
        .populate('teachers', 'lastname firstname englishname')
        .populate('students', 'lastname firstname englishname');
      
      res.json(courses);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

/* Get course by id */
router.get('/:_id', authenticate, (req, res) => {
	var query = {_id: req.params._id};
	
	Course.findOne(query, (err, course) => {
		if(err) {
			console.error(err);
      res.status(500).json({ error: 'Server error' });
		}
		res.json(course);
	}).populate('books').populate('teachers', 'lastname firstname englishname').populate('students');
});

/* Create courses */
router.post('/', utils.verifyAdmin, async (req, res) => {
  try {
    const course = req.body;
    
    if('teachers' in course && course.teachers.length > 0) {
      const mongoose_ids = [];
      course.teachers.forEach(id => {
        let _id = mongoose.Types.ObjectId(id);
        mongoose_ids.push(_id);
      });
      course.teachers = mongoose_ids;
    }

    const created_course = await Course.create(course);
    
    // Update all teachers with the new course ID
    if (created_course.teachers && created_course.teachers.length > 0) {
      const teacherUpdatePromises = created_course.teachers.map(id => 
        Teacher.findOneAndUpdate(
          {_id: id}, 
          {'$addToSet': { 'courses': created_course._id }}, 
          { new: true }
        )
      );
      
      await Promise.all(teacherUpdatePromises);
    }

    res.json(created_course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: 'Error creating course', error: err.message });
  }
});

/* Update course */
router.put('/:_id', utils.verifyAdmin, async (req, res) => {
  try {
    const updated_fields = req.body;
    const query = {_id: req.params._id};
    // if the field doesn't exist $set will set a new field
    const update = {
      '$set': updated_fields
    };
    const options = { new: true }; // newly updated record

    // First get the current course to handle teacher updates properly
    const existingCourse = await Course.findOne(query);
    if (!existingCourse) {
      return res.status(404).json({ success: false, msg: 'Course not found' });
    }

    // Remove course from previous teachers
    if ('teachers' in updated_fields && updated_fields.teachers.length > 0) {
      const teacherRemovePromises = [];
      
      if (existingCourse.teachers && existingCourse.teachers.length > 0) {
        for (const teacherId of existingCourse.teachers) {
          teacherRemovePromises.push(
            Teacher.findOneAndUpdate(
              { _id: teacherId.toString() },
              { $pull: { 'courses': existingCourse._id.toString() } },
              { new: true }
            )
          );
        }
        await Promise.all(teacherRemovePromises);
      }
    }

    // Update the course
    const course = await Course.findOneAndUpdate(query, update, options);

    // Add course to new teachers
    if ('teachers' in course && course.teachers.length > 0) {
      const teacherAddPromises = course.teachers.map(tid => 
        Teacher.findOneAndUpdate(
          { _id: tid.toString() },
          { '$addToSet': { 'courses': course._id.toString() } },
          options
        )
      );
      
      await Promise.all(teacherAddPromises);
    }

    // Return the updated course with populated fields
    const populatedCourse = await Course.findOne(query)
      .populate('books')
      .populate('teachers', 'lastname firstname englishname')
      .populate('students', 'lastname firstname englishname');

    res.json(populatedCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: 'Error updating course', error: err.message });
  }
});

/* Delete course */
router.delete('/:_id', utils.verifyAdmin, async (req, res) => {
  try {
    const query = {_id: req.params._id};

    // First find the course
    const course = await Course.findOne(query);
    if (!course) {
      return res.status(404).json({success: false, msg: 'Course not found'});
    }

    // Remove course from all teachers
    if (course.teachers && course.teachers.length > 0) {
      const teacherUpdatePromises = course.teachers.map(tid => 
        Teacher.findOneAndUpdate(
          { _id: tid }, 
          { $pull: { 'courses': course._id } }, 
          { new: true }
        )
      );
      
      await Promise.all(teacherUpdatePromises);
    }
    
    // Now delete the course
    const deletedCourse = await Course.findOneAndRemove(query);
    
    res.json({success: true, msg: 'Course deleted.'});
  } catch (err) {
    console.error(err);
    return res.status(500).json({success: false, msg: 'Cannot remove course', error: err.message});
  }
});

/* Add student */
router.post('/:_id/post_student', utils.verifyAdmin, async (req, res) => {
  try {
    const query = {_id: req.params._id};
    const body = req.body;

    if (!body.studentID) {
      return res.status(400).json({ success: false, msg: 'Student ID is required' });
    }

    const update = {
      '$addToSet': {
        "students": body.studentID
      }
    };

    const options = {new: true};

    // Update course with new student
    const course = await Course.findOneAndUpdate(query, update, options);
    
    if (!course) {
      return res.status(404).json({ success: false, msg: 'Course not found' });
    }

    // Update all students with the course ID
    const studentUpdatePromises = course.students.map(id => 
      Student.findOneAndUpdate(
        {_id: id}, 
        {'$addToSet': { 'courses': course._id }}, 
        options
      )
    );
    
    await Promise.all(studentUpdatePromises);

    // Return populated course data
    const populatedCourse = await Course.findById(query._id)
      .populate('books')
      .populate('teachers', 'lastname firstname englishname')
      .populate('students', 'lastname firstname englishname');

    res.json(populatedCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: 'Error adding student to course', error: err.message });
  }
});

/* Delete student */
router.put('/:_id/delete_student', utils.verifyAdmin, async (req, res) => {
  try {
    const query = {_id: req.params._id};
    const body = req.body;

    if (!body.studentID) {
      return res.status(400).json({ success: false, msg: 'Student ID is required' });
    }

    const update = {
      '$pull': {
        "students": body.studentID
      }
    };

    const options = {new: true};

    // Update course by removing student
    const course = await Course.findOneAndUpdate(query, update, options);
    
    if (!course) {
      return res.status(404).json({ success: false, msg: 'Course not found' });
    }

    // Update all students by removing course reference
    const studentUpdatePromises = course.students.map(id => 
      Student.findOneAndUpdate(
        {_id: id}, 
        {'$pull': { 'courses': course._id }}, 
        options
      )
    );
    
    await Promise.all(studentUpdatePromises);

    // Return populated course data
    const populatedCourse = await Course.findById(query._id)
      .populate('books')
      .populate('teachers', 'lastname firstname englishname')
      .populate('students', 'lastname firstname englishname');

    res.json(populatedCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: 'Error removing student from course', error: err.message });
  }
});

/* Add book */
router.post('/:_id/post_book', utils.verifyAdmin, (req, res) => {
  let query = {_id: req.params._id};
  let body = req.body;

  let update = {
    '$push': {
      "books": body.bookID
    }
  }

  let options = {new: true};

  Course.findOneAndUpdate(query, update, options, (err, course) => {
    if(err) throw(err);
    res.json(course);
  }).populate('books').populate('teachers', 'lastname firstname englishname').populate('students', 'lastname firstname');
});

/* Delete book */
router.put('/:_id/delete_book', utils.verifyAdmin, (req, res) => {
  let query = {_id: req.params._id};
  let body = req.body;

  let update = {
    '$pull': {
      "books": body.bookID
    }
  }

  let options = {new: true};

  Course.findOneAndUpdate(query, update, options, (err, course) => {
    if(err) throw(err);
    res.json(course);
  }).populate('books').populate('teachers', 'lastname firstname englishname').populate('students', 'lastname firstname');
});

module.exports = router;