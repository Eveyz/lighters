require 'json'

class ReportsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_report, only: [:show, :edit, :update, :destroy]
  before_action :teacher?, only: [:new, :edit]
  before_action :set_teacher_student_course_action, only: [:new, :edit]
  before_action :check_teacher_legitimacy, only: [:new, :edit]

  # GET /reports
  # GET /reports.json
  def index
    @reports = Report.all
  end

  # GET /reports/1
  # GET /reports/1.json
  def show
  end

  # GET /reports/new
  def new
    @report = Report.new
  end

  # GET /reports/1/edit
  def edit
  end

  # POST /reports
  # POST /reports.json
  def create
    @report = Report.new(report_params)
    respond_to do |format|
      if @report.save
        format.html { 
          redirect_to me_teacher_path(current_user.teacher)
          flash[:success] = '成功生成报告' 
        }
        format.json { render :show, status: :created, location: @report }
      else
        format.html { render :new }
        format.json { render json: @report.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /reports/1
  # PATCH/PUT /reports/1.json
  def update
    respond_to do |format|
      if @report.update(report_params)
        format.html { 
          redirect_to me_teacher_path(current_user.teacher)
          flash[:success] = '成功更新报告' 
        }
        format.json { render :show, status: :ok, location: @report }
      else
        format.html { render :edit }
        format.json { render json: @report.errors, status: :unprocessable_entity }
      end
    end
  end

  def get_previous_report_books
    @course = Course.find(params[:course_id])
    @student = Student.find(params[:student_id])
    @field = params[:field]
    @books = []
    if params[:actions] == "edit"
      # if action is edit, then should return review and content
      @report = Report.find(params[:report_id])
      if @report.present?
        if params[:field] == "review"
          @books = @report.review
        elsif params[:field] == "future_books"
          @books = @report.future_books
        else
          @books = @report.content
        end
      end
    else
      # action is new, only return previous report content
      @previous_report = Report.where(course_id: @course, student_id: @student).last
      if @previous_report.present?
        @books = @previous_report.content
      end
    end
  end

  # DELETE /reports/1
  # DELETE /reports/1.json
  def destroy
    @report.destroy
    respond_to do |format|
      format.html { 
        redirect_to reports_url
        flash[:success] = '成功删除报告' 
      }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_report
      @report = Report.find(params[:id])
    end

    def redirect_to_root
      redirect_to root_path
    end

    def set_teacher_student_course_action
      if params[:teacher_id].present? and params[:student_id].present? and params[:course_id].present?
        begin
          @teacher = Teacher.find(params[:teacher_id])
          @student = Student.find(params[:student_id])
          @course = Course.find(params[:course_id])
        rescue
          redirect_to_root
        end
        @action = params[:action]
      else
        redirect_to_root
      end
    end

    def teacher?
      unless current_user.teacher?
        redirect_to_root
      end
    end

    def check_teacher_legitimacy
      current_teacher = current_user.teacher
      unless @teacher == current_teacher and current_teacher.courses.include?(@course) and current_teacher.students.include?(@student)
        flash[:alert] = "你没有权限"
        redirect_to_root
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def report_params
      params.require(:report).permit(:course_id, :teacher_id, :student_id, :course_date, :start_time, :end_time, :focus, :tutor_comment, :homework, {audios: []}, links: {}, future_books: [], review: {}, content: {})
    end
end
