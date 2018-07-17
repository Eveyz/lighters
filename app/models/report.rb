class Report < ApplicationRecord
  belongs_to :course
  has_many :report_keywords
end
