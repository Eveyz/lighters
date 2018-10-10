/* 
 * @author: znz
*/

const express = require('express');
const path = require('path');
const router = express.Router();
const Course = require('../models/course');
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
router.post('/', authenticate, (req, res) => {
  var body = req.body;
  var ids = [];
  ids.push(mongoose.Types.ObjectId(body.teacher));
  body.teachers = ids;
	Course.create(body, function(err, course) {
		if(err) {
			throw err;
    }
    course.populate('books').populate('teachers', 'lastname firstname englishname').populate('students', function(err, course) {
      if(err) {
        throw err;
      }
      res.json(course);
    });
	})
});

/* Delete course */
router.delete('/:_id', (req, res) => {
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

/* Update course */
router.use('/:_id', (req, res) => {
	var course = req.body;
	var query = req.params._id;
	// if the field doesn't exist $set will set a new field
	var update = {
		'$set': {
			title: course.title,
			description: course.description,
			author: course.author
		}
	};

	var options = { new: true }; // newly updated record

	Course.findOneAndUpdate(query, update, options, (err, course) =>{
		if(err) {
			throw err;
		}
		res.json(course);
	}).populate('books').populate('teachers', 'lastname firstname englishname').populate('students');
});

module.exports = router;