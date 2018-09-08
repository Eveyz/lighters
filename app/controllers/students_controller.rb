class StudentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_student, only: [:show, :edit, :update, :destroy, :record_audio, :post_audio]

  # GET /students
  # GET /students.json
  def index
    @students = Student.all
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @students.pluck(:id, :firstname, :lastname) }
    end
  end

  # GET /students/1
  # GET /students/1.json
  def show
  end

  # GET /students/new
  def new
    @student = Student.new
  end

  # GET /students/1/edit
  def edit
  end

  # POST /students
  # POST /students.json
  def create
    if params[:student][:expectation].present?
      params[:student][:expectation] = params[:student][:expectation].join(",")
    end
    if params[:student][:paragraph].present?
      params[:student][:paragraph] = params[:student][:paragraph].join(",")
    end
    
    @student = current_user.create_student(student_params)
    @student.status = "RECORD_AUDIO"

    respond_to do |format|
      if @student.save
        format.html { redirect_to record_audio_student_path(@student), notice: 'Student was successfully created.' }
        format.json { render :show, status: :created, location: @student }
      else
        format.html { render :new }
        format.json { render json: @student.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /students/1
  # PATCH/PUT /students/1.json
  def update
    respond_to do |format|
      if @student.update(student_params)
        format.html { redirect_to @student, notice: 'Student was successfully updated.' }
        format.json { render :show, status: :ok, location: @student }
      else
        format.html { render :edit }
        format.json { render json: @student.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /students/1
  # DELETE /students/1.json
  def destroy
    @student.destroy
    respond_to do |format|
      format.html { redirect_to students_url, notice: 'Student was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def me
  end

  def search_student
    @students = Student.where("lastname like ? OR firstname like ?","%#{params[:name]}%", "%#{params[:name]}").pluck(:id, :firstname, :lastname)
    respond_to do |format|
      format.json { render json: @students }
    end
  end

  def record_audio
  end

  def post_audio
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_student
      @student = Student.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def student_params
      params.require(:student).permit(:pphone, :pemail, :pwechat, :pqq, :firstname, :lastname, :englishname, :age, :birthday, :gender, :city, :schoolname, :schoolstatus, :level, :time, :estimate, :expectation, :paragraph, :dailyreading, :currentreadingstatus, :penglishlevel, :custody, :way, :reason)
    end
end
