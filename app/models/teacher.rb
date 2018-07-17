class Teacher < ApplicationRecord
  belongs_to :user
  has_many :courses
  # has_and_belongs_to_many :students

  has_many :teacher_students
  has_many :students, :through => :teacher_students

  mount_uploaders :audio, AudioUploader
  mount_uploaders :resume, FileUploader
  mount_uploaders :certificates, CertificateUploader

  def active?
    return self.status == "active"
  end

  def pending?
    self.status == "pending"
  end

  def fullname
    return self.lastname + self.firstname
  end
end
