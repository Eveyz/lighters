class TeachersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_teacher, only: [:show, :edit, :update, :destroy, :me, :activate, :deactivate, :course_manage, :student_reports]

  # GET /teachers
  # GET /teachers.json
  def index
    @teachers = Teacher.all
    @activeTeachers = Teacher.where(status: "active")
    @pendingTeachers = Teacher.where(status: "pending")
  end

  # GET /teachers/1
  # GET /teachers/1.json
  def show
  end

  # GET /teachers/new
  def new
    @teacher = Teacher.new
  end

  # GET /teachers/1/edit
  def edit
  end

  # POST /teachers
  # POST /teachers.json
  def create
    @teacher = current_user.create_teacher(teacher_params)

    respond_to do |format|
      if @teacher.save
        format.html {
          if @teacher.active?
            redirect_to me_teacher_path(@teacher)
            flash[:success] = 'Teacher was successfully created.' 
          else
            redirect_to pending_teacher_path(@teacher)
            flash[:notice] = 'Teacher was successfully created.'
          end
        }
        format.json { render :show, status: :created, location: @teacher }
      else
        format.html { render :new }
        format.json { render json: @teacher.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /teachers/1
  # PATCH/PUT /teachers/1.json
  def update
    respond_to do |format|
      if @teacher.update(teacher_params)
        format.html { redirect_to @teacher, notice: 'Teacher was successfully updated.' }
        format.json { render :show, status: :ok, location: @teacher }
      else
        format.html { render :edit }
        format.json { render json: @teacher.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /teachers/1
  # DELETE /teachers/1.json
  def destroy
    @teacher.destroy
    respond_to do |format|
      format.html { redirect_to teachers_url, notice: 'Teacher was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def me
    @students = @teacher.students
    @courses = @teacher.courses
    @books = []
    book_hash = {}
    @courses.each do |course|
      course.books.each do |book|
        unless book_hash.has_key?(book.id)
          @books << book
          book_hash[book.id] = true
        end
      end
    end
    @course = Course.new
    @report = Report.new
  end

  def activate
    @teacher.status = "active"
    @teacher.save
    respond_to do |format|
      format.html { 
        redirect_to teachers_url
        flash[:success] = '激活教师成功.' 
      }
      format.json { head :no_content }
    end
  end

  def deactivate
    @teacher.status = "inactive"
    @teacher.save
    respond_to do |format|
      format.html { redirect_to teachers_url, notice: '冻结教师成功.' }
      format.json { head :no_content }
    end
  end

  def course_manage
    @course = Course.find(params[:course_id])
    @books = @course.books
    @students = @course.students
    @report = Report.new
  end

  def student_reports
    @course = Course.find(params[:course_id])
    @student = Student.find(params[:student_id])
    @reports = @course.reports.where(student_id: params[:student_id])
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_teacher
      @teacher = Teacher.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def teacher_params
      params.require(:teacher).permit(:firstname, :lastname, :englishname, :age, :birthday, :gender, :city, :work, :education, :experience, :otherexperience, :profour, :proeight, :levelsix, :other, :honor, :interaction, :like, :availabletime, :audio, :comments, :resume, :user_id, certificates: [])
    end
end
