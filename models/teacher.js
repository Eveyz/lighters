/* 
 * @author: znz
*/

var mongoose = require('mongoose');

var teacherSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
  firstname: String,
  lastname: String,
  englishname: String,
  age: Number,
  birthday: String,
  gender: String,
  city: String,
  work: String,
  education: String,
  experience: String,
  otherexperience: String,
  profour: Number,
  proeight: Number,
  levelsix: Number,
  other: String,
  honor: String,
  interaction: String,
  like: String,
  availabletime: Number,
  audio: String,
  comments: String,
  resume: String,
  level: String,
  status: { type: String, default: "pending" },
  certificates: [],
  students: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Student'} ],
  courses: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Course'} ],
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_at: Date,
  updated_at: Date
});

teacherSchema.pre("save", function(next){
  var currentDate = new Date();
  this.updated_at = currentDate;
  if ( !this.created_at ) {
    this.created_at = currentDate;
  }
  next();
});

var Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;