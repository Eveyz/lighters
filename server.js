require('dotenv').config();

const fs = require('fs');
const https = require('https');

const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const schedule = require('node-schedule');

const config = require("./config");
const helper = require('./helper')

const adminAPI = require("./api/admin");
const usersAPI = require("./api/users");
const booksAPI = require("./api/books");
const coursesAPI = require("./api/courses");
const teachersAPI = require("./api/teachers");
const studentsAPI = require("./api/students");
const reportsAPI = require("./api/reports");
const keywordsAPI = require("./api/keywords");
const schedulesAPI = require("./api/schedule");
const levelSalaryAPI = require("./api/level_salary");
const paychecksAPI = require("./api/paycheck");
const compensationsAPI = require("./api/compensation");
const transactionsAPI = require("./api/transaction");
const tuitionsAPI = require("./api/tuition");
const teacherRatesAPI = require("./api/teacher_rates");
const teacherLevelAPI = require("./api/teacher_level");
const evaluationsAPI = require("./api/evaluations");
const notificationsAPI = require("./api/notifications");

const server = express();
server.set('trust proxy', true);

// Express Middleware
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use('/public', express.static(__dirname + '/public'));

/* API 
 * @author: znz
*/
server.use('/admin', adminAPI);
server.use('/users', usersAPI);
server.use('/books', booksAPI);
server.use('/courses', coursesAPI);
server.use('/teachers', teachersAPI);
server.use('/students', studentsAPI);
server.use('/reports', reportsAPI);
server.use('/keywords', keywordsAPI);
server.use('/schedules', schedulesAPI);
server.use('/level_salaries', levelSalaryAPI);
server.use('/paychecks', paychecksAPI);
server.use('/compensations', compensationsAPI);
server.use('/transactions', transactionsAPI);
server.use('/tuitions', tuitionsAPI);
server.use('/teacher_rates', teacherRatesAPI);
server.use('/teacher_levels', teacherLevelAPI);
server.use('/evaluations', evaluationsAPI);
server.use('/notifications', notificationsAPI);

// server.use((req, res) => {
//   res.status(404).json({error: "not found"})
// })

// server.use((error, req, res, next) => {
//   res.status(500).json({error: error.message})
// })

const rule = new schedule.RecurrenceRule();
rule.second = 3;
const job = schedule.scheduleJob("0 0 2 * * *", function(){
  helper.calculateTeacherCourseNum()
});

helper.calculateTeacherCourseNum()

/* MongoDB connection 
 * @author: znz
*/
var db = config.db;
const PORT = process.env.PORT || config.port;

const gracefulShutdown = () => {
  mongoose.connection.close(false, () => {
    console.log('Mongo closed');
    server.close(() => {
      console.log('Shutting down...');
    });
  });
};

if (process.env.NODE_ENV === "production") {
  server.use(logger('combined'));
  server.use(express.static(path.join(__dirname, '/build')));

  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'));
  });

  const privateKey = fs.readFileSync(`${process.env.SSL_LOCATION}/${process.env.SSL_KEY}`, 'utf8');
  const certificate = fs.readFileSync(`${process.env.SSL_LOCATION}/${process.env.SSL_PEM}`, 'utf8');
  const credentials = {key: privateKey, cert: certificate};

  https.createServer(credentials, server).listen(PORT, () => {
    console.log("Production server is on")
    // Handle kill commands
    process.on('SIGTERM', gracefulShutdown);

    // Prevent dirty exit on code-fault crashes:
    process.on('uncaughtException', gracefulShutdown);
  });
} else if (process.env.NODE_ENV === "render") {
  server.use(logger('combined'));
  server.use(express.static(path.join(__dirname, '/build')));

  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'));
  });

  https.createServer(server).listen(PORT, () => {
    console.log(`Render production server is on port: ${PORT}`)
    // Handle kill commands
    process.on('SIGTERM', gracefulShutdown);

    // Prevent dirty exit on code-fault crashes:
    process.on('uncaughtException', gracefulShutdown);
  });
} else {
  server.listen(PORT, () => {
    console.info('DEV express listenning on port ', PORT);
    // Handle kill commands
    process.on('SIGTERM', gracefulShutdown);

    // Prevent dirty exit on code-fault crashes:
    process.on('uncaughtException', gracefulShutdown);
  });
}


module.exports = server