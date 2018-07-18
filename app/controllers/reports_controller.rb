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
    @keywords = []
    @books = @course.books
    @books.each do |book|
      @keywords = @keywords + book.keywords.pluck(:content)
    end
  end

  # GET /reports/1/edit
  def edit
    @keywords = @report.report_keywords.pluck(:content)
    @teacher = Teacher.find(params[:teacher_id])
    @student = Student.find(params[:student_id])
    @course = Course.find(params[:course_id])
  end

  # POST /reports
  # POST /reports.json
  def create
    @report = Report.new(report_params)
    @keywords = params[:keywords]

    respond_to do |format|
      if @report.save
        if @keywords.present?
          @keywords.each do |kw|
            unless kw.empty?
              keyword = ReportKeyword.new
              keyword.content = kw
              keyword.report_id = @report.id
              keyword.save
            end
          end
        end
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
    @keywords = []
    respond_to do |format|
      if @report.update(report_params)
        @report.keywords.destroy_all
        @keywords = params[:keywords]
        unless @keywords.empty?
          @keywords.each do |kw|
            unless kw.empty?
              keyword = ReportKeyword.new
              keyword.content = kw
              keyword.report_id = @report.id
              keyword.save
            end
          end
        end
        format.html { redirect_to me_teacher_path(current_user.teacher), notice: 'Report was successfully updated.' }
        format.json { render :show, status: :ok, location: @report }
      else
        format.html { render :edit }
        format.json { render json: @report.errors, status: :unprocessable_entity }
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
      params.require(:report).permit(:course_id, :teacher_id, :student_id, :course_date, :start_time, :end_time,:focus, :tutor_comment, :homework, :future_book, {audios: []})
    end
end
