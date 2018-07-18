class Report < ApplicationRecord
  belongs_to :course
  has_many :report_keywords

  mount_uploaders :audios, AudioUploader
end
