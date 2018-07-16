class Student < ApplicationRecord
  belongs_to :user
  # has_and_belongs_to_many :courses
  # has_and_belongs_to_many :teachers

  has_many :course_students
  has_many :courses, :through => :course_students

  has_many :teacher_students
  has_many :teachers, :through => :teacher_students

  def fullname
    return self.lastname + self.firstname
  end
end
