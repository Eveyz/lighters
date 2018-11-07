/* 
 * @author: znz
*/

const express = require('express');
const path = require('path');
const router = express.Router();
const Course = require('../models/course');
const Teacher = require('../models/teacher');
const Student = require('../models/student');
const jwt = require('jsonwebtoken');
const config = require('../config');
const utils = require('../utils');
const mongoose = require('mongoose');
import authenticate from '../middlewares/authenticate';

/* Get Books */
router.get('/', utils.verifyAdmin, (req, res) => {
  // console.log(req.currentUser);
	Course.find((err, courses) => {
		if(err) {
			throw err;
		}
		res.json(courses);
	}).populate('books').populate('teachers', 'lastname firstname englishname').populate('students');
});

/* Get course by id */
router.get('/:_id', authenticate, (req, res) => {
	var query = {_id: req.params._id};
	
	Course.findOne(query, (err, course) => {
		if(err) {
			throw err;
		}
		res.json(course);
	}).populate('books').populate('teachers', 'lastname firstname englishname').populate('students');
});

/* Create courses */
router.post('/', utils.verifyAdmin, (req, res) => {
  var course = req.body;

  if(course.teachers.length > 0) {
    let mongoose_ids = [];
    course.teachers.forEach(id => {
      let _id = mongoose.Types.ObjectId(id);
      mongoose_ids.push(_id);
    });
    course.teachers = mongoose_ids;
  }
  
	Course.create(course, function(err, course) {
		if(err) {
			throw err;
    }
    course.populate('books').populate('teachers', 'lastname firstname englishname').populate('students', function(err, c) {
      if(err) {
        throw err;
      }
      // append course into assign teacher
      c.teachers.forEach(id => {
        Teacher.findOneAndUpdate(
          {_id: id}, 
          {'$addToSet': { 'courses': c.id } }, 
          options, 
          (err, teacher) => {
          if(err) throw err;
        })
      });
      res.json(c);
    });
	})
});

/* Update course */
router.put('/:_id', utils.verifyAdmin, (req, res) => {
  let course = req.body;

  // update teacher for course
  if(course.teachers.length > 0) {
    let mongoose_ids = [];
    course.teachers.forEach(id => {
      mongoose_ids.push(mongoose.Types.ObjectId(id));
    });
    course.teachers = mongoose_ids;
  }

  let query = {_id: req.params._id};
	// if the field doesn't exist $set will set a new field
	let update = {
		'$set': course
	};

	var options = { new: true }; // newly updated record

	Course.findOneAndUpdate(query, update, options, (err, course) =>{
		if(err) {
			throw err;
    }
    course.populate('books').populate('teachers', 'lastname firstname englishname').populate('students', function(err, c) {
      if(err) {
        throw err;
      }
      // append course into assign teacher
      c.teachers.forEach(id => {
        Teacher.findOneAndUpdate(
          {_id: id}, 
          {'$addToSet': { 'courses': c.id } }, 
          options, 
          (err, teacher) => {
          if(err) throw err;
        })
      });

      res.json(c);
    });
	});
});

/* Delete course */
router.delete('/:_id', utils.verifyAdmin, (req, res) => {
  var query = {_id: req.params._id};
	
	Course.remove(query, (err, courses) => {
		if(err) {
			throw err;
    }
    const response = {
      message: "Course successfully deleted"
    };
		res.json(response);
	});
});

/* Add student */
router.post('/:_id/post_student', utils.verifyAdmin, (req, res) => {
  let query = {_id: req.params._id};
  let body = req.body;

  let update = {
    '$addToSet': {
      "students": body.studentID
    }
  }

  let options = {new: true};

  Course.findOneAndUpdate(query, update, options, (err, course) => {
    if(err) throw(err);

    course.populate('books').populate('teachers', 'lastname firstname englishname').populate('students', function(err, c) {
      if(err) {
        throw err;
      }

      // append course into assign teacher
      c.students.forEach(id => {
        Student.findOneAndUpdate(
          {_id: id}, 
          {'$addToSet': { 'courses': c.id } }, 
          options, 
          (err, student) => {
            if(err) throw err;
          }
        )
      });

      // add students to teacher
      // c.teachers.forEach(id => {
      //   Teacher.findOneAndUpdate(
      //     {_id: id},
      //     {'$addToSet': { 'student': id }},
      //     options,
      //     (err, teacher) => {
      //       if(err) throw err;
      //     }
      //   )
      // });

      res.json(c);
    });
  });
});

/* Delete student */
router.put('/:_id/delete_student', utils.verifyAdmin, (req, res) => {
  let query = {_id: req.params._id};
  let body = req.body;

  let update = {
    '$pull': {
      "students": body.studentID
    }
  }

  let options = {new: true};

  Course.findOneAndUpdate(query, update, options, (err, course) => {
    if(err) throw(err);
    
    course.populate('books').populate('teachers', 'lastname firstname englishname').populate('students', function(err, c) {
      if(err) {
        throw err;
      }
      // append course into assign teacher
      c.students.forEach(id => {
        Student.findOneAndUpdate(
          {_id: id}, 
          {'$pull': { 'courses': c.id } }, 
          options, 
          (err, student) => {
          if(err) throw err;
        })
      });

      res.json(c);
    });

  });
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