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
router.get('/', utils.verifyAdmin, (req, res) => {
  // console.log(req.currentUser);
  var _query = req.query
  if(req.query.teacher_id) {
    // get courses data
    _query = {
      "teachers": {"$in": [req.query.teacher_id]}
    }
    Course.find(_query, async (err, courses) => {
      if(err) {
        console.error(err);
      }
      var response = []
      var all_promises = []
      for (const course of courses) {
        all_promises.push(
          new Promise(async (resolve, reject) => {
            let _count = await Report.find({course_id: course._id}).countDocuments()
            resolve(_count)
            course._doc["count"] = _count
            response.push(course)
          })
        )
      }
      await Promise.all(all_promises)
      res.json(response)
    }).populate('books').populate('teachers', 'lastname firstname englishname').populate('students', 'lastname firstname englishname ');
  } else if(req.query.field) {
    // query courses grouping by field
    var field = req.query.field
    var grouped_active_courses = {}
    var grouped_inactive_courses = {}
    Course.find((err, courses) => {
      if(err) {
        console.error(err)
      }
      courses.forEach(course => {
        let grouped_courses = course["status"] === "active" ? grouped_active_courses : grouped_inactive_courses
        if(!(course[field] in grouped_courses)) {
          grouped_courses[course[field]] = []
        }
        grouped_courses[course[field]].push(course)
      })
      res.json({
        active: grouped_active_courses,
        inactive: grouped_inactive_courses
      })
    }).populate('books').populate('teachers', 'lastname firstname englishname').populate('students', 'lastname firstname englishname');
  } else {
    Course.find(_query, (err, courses) => {
      if(err) {
        console.error(err);
      }
      res.json(courses);
    }).populate('books').populate('teachers', 'lastname firstname englishname').populate('students', 'lastname firstname englishname');
  }
});

/* Get course by id */
router.get('/:_id', authenticate, (req, res) => {
	var query = {_id: req.params._id};
	
	Course.findOne(query, (err, course) => {
		if(err) {
			console.error(err);
		}
		res.json(course);
	}).populate('books').populate('teachers', 'lastname firstname englishname').populate('students');
});

/* Create courses */
router.post('/', utils.verifyAdmin, async (req, res) => {
  var course = req.body;
  
  if('teachers' in course && course.teachers.length > 0) {
    let mongoose_ids = [];
    course.teachers.forEach(id => {
      let _id = mongoose.Types.ObjectId(id);
      mongoose_ids.push(_id);
    });
    course.teachers = mongoose_ids;
  }

  var created_course = await Course.create(course)
  // .populate('books').populate('teachers', 'lastname firstname englishname').populate('students')

  // append course into assign teacher
  created_course.teachers.forEach(id => {
    Teacher.findOneAndUpdate(
      {_id: id}, 
      {'$addToSet': { 'courses': created_course._id } }, 
      { new: true }, 
      (err, teacher) => {
      if(err) console.error(err);
    })
  });

  res.json(created_course);

});

/* Update course */
router.put('/:_id', utils.verifyAdmin, async (req, res) => {
  let updated_fields = req.body;

  let query = {_id: req.params._id};
	// if the field doesn't exist $set will set a new field
	let update = {
		'$set': updated_fields
  };

  // remove course from previous teachers
  if('teachers' in updated_fields && updated_fields.teachers.length > 0) {
    Course.findOne(query, (err, course) => {
      if(err) {
        console.error(err);
      }
      course.teachers.forEach((t) => {
        Teacher.findOne({_id: t.toString()}, (err, teacher) => {
          if(err) {
            console.error(err);
          }
          if(teacher) {
            teacher.courses.pull(course._id.toString())
            teacher.save()
          }
        })
      })
    })
  }

	var options = { new: true }; // newly updated record

	var course = await Course.
    findOneAndUpdate(query, update, options)

  if('teachers' in course) {
    // append course into assigned teacher
    course.teachers.forEach(tid => {
      Teacher.findOneAndUpdate({_id: tid.toString()}, {'$addToSet': { 'courses': course._id.toString() } }, options, (err, teacher) => {
        if(err) {
          console.error(err);
        }
      })
    })
  }

  res.json(course);
});

/* Delete course */
router.delete('/:_id', utils.verifyAdmin, async (req, res) => {
  var query = {_id: req.params._id};

  var course = await Course.findOne(query);
  if("teachers" in course) {
    course.teachers.forEach(async tid => {
      var teacher = await Teacher.findOneAndUpdate({ _id: tid }, { $pull: { 'courses': course._id } }, { new: true });
    })
  }
	
  Course.findOneAndRemove(query, (err, course) => {
		if (err) {
			return res.json({success: false, msg: 'Cannot remove course'});
		}
		if (!course) {
			return res.status(404).json({success: false, msg: 'Course not found'});
		}
    res.json({success: true, msg: 'Course deleted.'});
  });
});

/* Add student */
router.post('/:_id/post_student', utils.verifyAdmin, async (req, res) => {
  let query = {_id: req.params._id};
  let body = req.body;

  let update = {
    '$addToSet': {
      "students": body.studentID
    }
  }

  let options = {new: true};

  let course = await Course.findOneAndUpdate(query, update, options)

  // append course into assign teacher
  course.students.forEach(id => {
    Student.findOneAndUpdate(
      {_id: id}, 
      {'$addToSet': { 'courses': course._id } }, 
      options, 
      (err, student) => {
        if(err) console.error(err);
      }
    )
  });

  res.json(course);

});

/* Delete student */
router.put('/:_id/delete_student', utils.verifyAdmin, async (req, res) => {
  let query = {_id: req.params._id};
  let body = req.body;

  let update = {
    '$pull': {
      "students": body.studentID
    }
  }

  let options = {new: true};

  let course = await Course.findOneAndUpdate(query, update, options)

  // append course into assign teacher
  course.students.forEach(id => {
    Student.findOneAndUpdate(
      {_id: id}, 
      {'$pull': { 'courses': course._id } }, 
      options, 
      (err, student) => {
      if(err) console.error(err);
    })
  });

  res.json(course);

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