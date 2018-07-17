class CourseBook < ApplicationRecord
  belongs_to :course
  belongs_to :book

  validates_uniqueness_of :book_id, :scope => :course_id, :message => "Dupliacte."
end
