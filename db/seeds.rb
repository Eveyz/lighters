# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# admin = User.new
# admin.email = 'admin@lighter.com'
# admin.identity = 'admin'
# admin.password = 'saiop147'
# admin.save!

# student_index = 1
# 10.times do
#   u = User.new
#   email = 'student' + student_index.to_s + '@lighter.com'
#   u.email = email
#   u.identity = '学员/家长'
#   u.password = 'saiop147'
#   u.save!
#   student = Student.new
#   student.user_id = u.id
#   student.lastname = "曾"
#   student.firstname = "小贤" + student_index.to_s
#   student.englishname = "Eve" + student_index.to_s
#   student.gender = "男"
#   student.age = 10
#   student.save!
#   student_index = student_index + 1
# end
# p "student created"

# teacher_index = 1
# 10.times do
#   u = User.new
#   email = 'teacher' + teacher_index.to_s + '@lighter.com'
#   u.email = email
#   u.identity = '老师'
#   u.password = 'saiop147'
#   u.save!
#   teacher = Teacher.new
#   teacher.user_id = u.id
#   teacher.lastname = "曾"
#   teacher.firstname = "老师" + teacher_index.to_s
#   teacher.englishname = "Steve" + teacher_index.to_s
#   teacher.gender = "女"
#   teacher.age = 20
#   teacher.save!
#   teacher_index = teacher_index + 1
# end
# p "teacher created"


categories = Book::CATEGORY
serials = ["Reading", "Writing", "Speaking", "Listening", "Nature", "Science", "Fiction"]
words = ["lock", "icky", "jumbled", "lively", "scarecrow", "proud", "throat", "apparatus", "greasy", "wave", "nasty", "song", "strip", "talk", "aunt", "pocket", "tempt", "finicky", "branch", "foamy", "phone", "ants", "stranger", "lovely", "stay", "trick", "flash", "overt", "wrist", "shirt", "childlike", "land", "guarded", "blow", "addicted", "teeny-tiny", "statuesque", "toy", "mysterious", "clover"]

100.times do
  b = Book.new
  b.rlevel = "RAX"
  b.lslevel = "9 - 10"
  b.age = 13
  cn = rand(7)
  b.category = categories[cn]
  sn = rand(7)
  b.serials = serials[sn]
  b.name = "I love " + serials[sn]
  keywords = []
  words_number = rand(20) + 1
  words_number.times do
    word_index = rand(40)
    keywords << words[word_index]
  end
  b.keywords = keywords
  b.save!
end
p "book created"