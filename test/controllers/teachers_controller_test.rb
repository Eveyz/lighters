require 'test_helper'

class TeachersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @teacher = teachers(:one)
  end

  test "should get index" do
    get teachers_url
    assert_response :success
  end

  test "should get new" do
    get new_teacher_url
    assert_response :success
  end

  test "should create teacher" do
    assert_difference('Teacher.count') do
      post teachers_url, params: { teacher: { age: @teacher.age, audio: @teacher.audio, availabletime: @teacher.availabletime, birthday: @teacher.birthday, city: @teacher.city, comments: @teacher.comments, education: @teacher.education, englishname: @teacher.englishname, experience: @teacher.experience, firstname: @teacher.firstname, gender: @teacher.gender, honor: @teacher.honor, interaction: @teacher.interaction, lastname: @teacher.lastname, levelsix: @teacher.levelsix, like: @teacher.like, other: @teacher.other, otherexperience: @teacher.otherexperience, proeight: @teacher.proeight, profour: @teacher.profour, resume: @teacher.resume, user_id: @teacher.user_id, work: @teacher.work } }
    end

    assert_redirected_to teacher_url(Teacher.last)
  end

  test "should show teacher" do
    get teacher_url(@teacher)
    assert_response :success
  end

  test "should get edit" do
    get edit_teacher_url(@teacher)
    assert_response :success
  end

  test "should update teacher" do
    patch teacher_url(@teacher), params: { teacher: { age: @teacher.age, audio: @teacher.audio, availabletime: @teacher.availabletime, birthday: @teacher.birthday, city: @teacher.city, comments: @teacher.comments, education: @teacher.education, englishname: @teacher.englishname, experience: @teacher.experience, firstname: @teacher.firstname, gender: @teacher.gender, honor: @teacher.honor, interaction: @teacher.interaction, lastname: @teacher.lastname, levelsix: @teacher.levelsix, like: @teacher.like, other: @teacher.other, otherexperience: @teacher.otherexperience, proeight: @teacher.proeight, profour: @teacher.profour, resume: @teacher.resume, user_id: @teacher.user_id, work: @teacher.work } }
    assert_redirected_to teacher_url(@teacher)
  end

  test "should destroy teacher" do
    assert_difference('Teacher.count', -1) do
      delete teacher_url(@teacher)
    end

    assert_redirected_to teachers_url
  end
end
