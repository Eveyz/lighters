class AdminController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin

  # Methods omitted

  def dashboard
    @cs = Course.all.size
    @st = Student.all.size
    @th = Teacher.all.size
    @bk = Book.all.size
  end

  private
    def require_admin
      unless current_user.admin?
        redirect_to root_path
      end
    end
end
