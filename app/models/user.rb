class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_one :teacher
  has_one :student
  mount_uploaders :avatars, AvatarUploader

  def admin?
    return self.identity == "admin"
  end

  def teacher?
    return self.identity == "老师"
  end

  def student?
    return self.identity == "学员/家长"
  end

end
