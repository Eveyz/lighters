class Book < ApplicationRecord
  # has_many :keywords

  has_many :course_books
  has_many :courses, :through => :course_books

  mount_uploaders :files, FileUploader

  CATEGORY = ["主流分级绘本", "名家绘本", "自然拼读", "科普读物", "动画教程", "写作教程", "学生自读"]
  
end
