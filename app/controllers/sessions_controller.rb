class SessionsController < Devise::SessionsController
  protected

  def after_sign_in_path_for(resource)
    p current_user.identity
    if current_user.identity == "老师"
      @teacher = current_user.teacher
      if @teacher.present?
        me_teacher_path(@teacher)
      else
        new_teacher_path
      end
    elsif current_user.identity == "admin"
      admin_dashboard_path
    else
      new_student_path
    end
  end
end