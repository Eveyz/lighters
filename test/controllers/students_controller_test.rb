require 'test_helper'

class StudentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @student = students(:one)
  end

  test "should get index" do
    get students_url
    assert_response :success
  end

  test "should get new" do
    get new_student_url
    assert_response :success
  end

  test "should create student" do
    assert_difference('Student.count') do
      post students_url, params: { student: { age: @student.age, birthday: @student.birthday, city: @student.city, custody: @student.custody, dailyreading: @student.dailyreading, estimate: @student.estimate, expectation: @student.expectation, firstname: @student.firstname, gender: @student.gender, lastname: @student.lastname, level: @student.level, paragraph: @student.paragraph, pemail: @student.pemail, penglishlevel: @student.penglishlevel, pphone: @student.pphone, pqq: @student.pqq, pwechat: @student.pwechat, reason: @student.reason, schoolname: @student.schoolname, schoolstatus: @student.schoolstatus, time: @student.time, way: @student.way } }
    end

    assert_redirected_to student_url(Student.last)
  end

  test "should show student" do
    get student_url(@student)
    assert_response :success
  end

  test "should get edit" do
    get edit_student_url(@student)
    assert_response :success
  end

  test "should update student" do
    patch student_url(@student), params: { student: { age: @student.age, birthday: @student.birthday, city: @student.city, custody: @student.custody, dailyreading: @student.dailyreading, estimate: @student.estimate, expectation: @student.expectation, firstname: @student.firstname, gender: @student.gender, lastname: @student.lastname, level: @student.level, paragraph: @student.paragraph, pemail: @student.pemail, penglishlevel: @student.penglishlevel, pphone: @student.pphone, pqq: @student.pqq, pwechat: @student.pwechat, reason: @student.reason, schoolname: @student.schoolname, schoolstatus: @student.schoolstatus, time: @student.time, way: @student.way } }
    assert_redirected_to student_url(@student)
  end

  test "should destroy student" do
    assert_difference('Student.count', -1) do
      delete student_url(@student)
    end

    assert_redirected_to students_url
  end
end
