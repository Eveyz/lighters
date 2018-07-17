class Book < ApplicationRecord
  has_many :keywords

  has_many :course_books
  has_many :courses, :through => :course_books


  mount_uploaders :files, FileUploader
end
