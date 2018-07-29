class ReportsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_report, only: [:show, :edit, :update, :destroy]

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
    @teacher = Teacher.find(params[:teacher_id])
    @student = Student.find(params[:student_id])
    @course = Course.find(params[:course_id])
    @action = params[:action]
  end

  # GET /reports/1/edit
  def edit
    @teacher = Teacher.find(params[:teacher_id])
    @student = Student.find(params[:student_id])
    @course = Course.find(params[:course_id])
    @action = params[:action]
  end

  # POST /reports
  # POST /reports.json
  def create
    @report = Report.new(report_params)
    respond_to do |format|
      if @report.save
        format.html { redirect_to me_teacher_path(current_user.teacher), notice: 'Report was successfully created.' }
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
        format.html { redirect_to me_teacher_path(current_user.teacher), notice: 'Report was successfully updated.' }
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
    @books = []
    if params[:action] == "edit"
      @report = Report.find(params[:reprot_id])
      if @previous_report.present?
        @books = @previous_report.review
        p "why not here"
        p @books
      end
    else
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
      format.html { redirect_to reports_url, notice: 'Report was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_report
      @report = Report.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def report_params
      params.require(:report).permit(:course_id, :teacher_id, :student_id, :course_date, :start_time, :end_time, :focus, :tutor_comment, :homework, :future_book, review: {}, content: {}, links: {}, audios: {})
    end
end
