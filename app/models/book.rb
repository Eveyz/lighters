class Book < ApplicationRecord
  has_many :keywords
  mount_uploaders :files, FileUploader
end
