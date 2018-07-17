class CoursesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course, only: [:show, :edit, :update, :destroy, :add_student, :enroll_student, :drop_student, :get_students, :add_books, :get_books, :append_book, :remove_book]

  # GET /courses
  # GET /courses.json
  def index
    @courses = Course.all
    @course = Course.new
    @teachers = Teacher.all
  end

  # GET /courses/1
  # GET /courses/1.json
  def show
  end

  # GET /courses/new
  def new
    @course = Course.new
  end

  # GET /courses/1/edit
  def edit
    @teachers = Teacher.all
  end

  # POST /courses
  # POST /courses.json
  def create
    @course = Course.new(course_params)

    respond_to do |format|
      if @course.save
        format.html { redirect_to courses_url, notice: 'Course was successfully created.' }
        format.json { render :show, status: :created, location: @course }
      else
        format.html { render :new }
        format.json { render json: @course.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /courses/1
  # PATCH/PUT /courses/1.json
  def update
    respond_to do |format|
      if @course.update(course_params)
        format.html { redirect_to courses_url, notice: 'Course was successfully updated.' }
        format.json { render :show, status: :ok, location: @course }
      else
        format.html { render :edit }
        format.json { render json: @course.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /courses/1
  # DELETE /courses/1.json
  def destroy
    @course.destroy
    respond_to do |format|
      format.html { redirect_to courses_url, notice: 'Course was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def get_students
    @students = @course.students
    respond_to do |format|
      format.json { render json: @students.pluck(:id, :firstname, :lastname) }
    end
  end

  def add_student
    @students = @course.students
    @teacher = Teacher.find(@course.teacher_id).fullname
  end

  def enroll_student
    @student = Student.find(params[:student_id])
    begin 
      @course.students << @student
    rescue Exception => e
      puts "#{e.message}"
    end

    @teacher = Teacher.find(@course.teacher_id)
    begin
      @teacher.students << @student
    rescue Exception => e
      puts "teacher #{e.message}"
    end
    # flash[:notice] = 'Student was added.'
    respond_to do |format|
      format.json { render json: @course.students.pluck(:id, :firstname, :lastname) }
    end
  end

  def drop_student
    @student = Student.find(params[:student_id])
    begin
      @course.students.delete(@student)
    rescue Exception => e
      puts "drop student #{e.message}"
    end

    @teacher = Teacher.find(@course.teacher_id)
    begin
      @teacher.students.delete(@student)
    rescue Exception => e
      puts "drop teacher #{e.message}"
    end

    respond_to do |format|
      format.json { render json: @course.students.pluck(:id, :firstname, :lastname) }
    end
  end

  def get_books
    @books = @course.books
    respond_to do |format|
      format.json { render json: @books.pluck(:id, :rlevel, :lslevel, :age, :category, :names) }
    end
  end

  def add_books
    @books = @course.books
    @teacher = Teacher.find(@course.teacher_id).fullname
  end

  def append_book
    @book = Book.find(params[:book_id])
    @message = ""
    begin
      @course.books << @book
    rescue Exception => e
      puts "#{e.message}"
      @message = "#{e.message}"
    end
    respond_to do |format|
      format.json { 
        render json: { 
          courses: @course.books.pluck(:id, :rlevel, :lslevel, :age, :category, :names), 
          msg: @message
        }
      }
    end
  end

  def remove_book
    @book = Book.find(params[:book_id])
    @message = ""
    begin
      @course.books.delete(@book)
    rescue Exception => e
      puts "#{e.message}"
      @message = "#{e.message}"
    end  
    respond_to do |format|
      format.json { 
        render json: { 
          courses: @course.books.pluck(:id, :rlevel, :lslevel, :age, :category, :names), 
          msg: @message
        }
      }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_course
      @course = Course.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def course_params
      params.require(:course).permit(:name, :level, :capacity, :code, :type, :teacher_id)
    end
end
