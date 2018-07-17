# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180717172231) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "books", force: :cascade do |t|
    t.string "rlevel"
    t.string "lslevel"
    t.string "age"
    t.string "category"
    t.string "names"
    t.integer "quantity"
    t.string "links"
    t.string "audio"
    t.string "file"
    t.string "cover"
    t.text "rcomments"
    t.text "bcomments"
    t.json "files", default: "{}", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "course_books", force: :cascade do |t|
    t.bigint "course_id"
    t.bigint "book_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_course_books_on_book_id"
    t.index ["course_id"], name: "index_course_books_on_course_id"
  end

  create_table "course_students", force: :cascade do |t|
    t.bigint "course_id"
    t.bigint "student_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_course_students_on_course_id"
    t.index ["student_id"], name: "index_course_students_on_student_id"
  end

  create_table "courses", force: :cascade do |t|
    t.integer "teacher_id"
    t.integer "student_id"
    t.string "name"
    t.string "level"
    t.integer "capacity"
    t.string "code"
    t.string "type"
    t.string "status", default: "active", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "keywords", force: :cascade do |t|
    t.string "content"
    t.bigint "book_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_keywords_on_book_id"
  end

  create_table "report_keywords", force: :cascade do |t|
    t.string "content"
    t.bigint "report_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["report_id"], name: "index_report_keywords_on_report_id"
  end

  create_table "reports", force: :cascade do |t|
    t.integer "teacher_id"
    t.integer "course_id"
    t.integer "student_id"
    t.string "type"
    t.string "course_date"
    t.integer "duration"
    t.integer "focus"
    t.string "tutor_comment"
    t.string "homework"
    t.string "future_book"
    t.string "start_time"
    t.string "end_time"
    t.integer "report_number"
    t.json "audios", default: "{}", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "students", force: :cascade do |t|
    t.string "pphone"
    t.string "pemail"
    t.string "pwechat"
    t.string "pqq"
    t.string "firstname"
    t.string "lastname"
    t.string "englishname"
    t.integer "age"
    t.string "birthday"
    t.string "gender"
    t.string "city"
    t.string "schoolname"
    t.string "schoolstatus"
    t.string "level"
    t.string "time"
    t.string "estimate"
    t.string "expectation"
    t.text "paragraph"
    t.string "dailyreading"
    t.string "currentreadingstatus"
    t.string "penglishlevel"
    t.string "custody"
    t.string "way"
    t.string "reason"
    t.string "status"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_students_on_user_id"
  end

  create_table "teacher_students", force: :cascade do |t|
    t.bigint "teacher_id"
    t.bigint "student_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["student_id"], name: "index_teacher_students_on_student_id"
    t.index ["teacher_id"], name: "index_teacher_students_on_teacher_id"
  end

  create_table "teachers", force: :cascade do |t|
    t.string "firstname"
    t.string "lastname"
    t.string "englishname"
    t.integer "age"
    t.string "birthday"
    t.string "gender"
    t.string "city"
    t.string "work"
    t.string "education"
    t.text "experience"
    t.text "otherexperience"
    t.integer "profour"
    t.integer "proeight"
    t.integer "levelsix"
    t.string "other"
    t.string "honor"
    t.text "interaction"
    t.string "like"
    t.integer "availabletime"
    t.string "audio"
    t.text "comments"
    t.string "resume"
    t.string "status", default: "pending", null: false
    t.json "certificates", default: "{}", null: false
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_teachers_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "phone", default: "", null: false
    t.string "wechat", default: "", null: false
    t.string "identity", default: "", null: false
    t.string "status", default: "", null: false
    t.binary "admin", default: "false", null: false
    t.string "encrypted_password", default: "", null: false
    t.json "avatars", default: "{}", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "course_books", "books"
  add_foreign_key "course_books", "courses"
  add_foreign_key "course_students", "courses"
  add_foreign_key "course_students", "students"
  add_foreign_key "keywords", "books"
  add_foreign_key "report_keywords", "reports"
  add_foreign_key "students", "users"
  add_foreign_key "teacher_students", "students"
  add_foreign_key "teacher_students", "teachers"
  add_foreign_key "teachers", "users"
end
