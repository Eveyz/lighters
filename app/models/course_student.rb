class CourseStudent < ApplicationRecord
  belongs_to :course
  belongs_to :student

  validates_uniqueness_of :student_id, :scope => :course_id, :message => "Dupliacte."
end
