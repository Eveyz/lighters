class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable
  has_one :teacher
  has_one :student
  mount_uploaders :avatars, AvatarUploader
  validates :identity, presence: { message: "请选择您的身份" }
  validates :email, presence: { message: "邮箱不能为空" }
  validates :wechat, presence: { message: "微信号不能为空" }
  validates :phone, presence: { message: "电话号码不能为空" }
  validates :password, presence: { message: "密码不能为空" }, length: { minimum: 6, message: "密码长度至少为6个字符" }
  validates :password_confirmation, presence: { message: "请确认密码" }
  
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
