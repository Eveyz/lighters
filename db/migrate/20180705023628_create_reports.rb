class CreateReports < ActiveRecord::Migration[5.1]
  def change
    create_table :reports do |t|
      t.integer :teacher_id
      t.integer :course_id
      t.integer :student_id
      t.string :type
      t.datetime :course_date
      t.integer :duration
      t.integer :focus
      t.string :tutor_comment
      t.string :homework
      t.string :future_book
      t.datetime :start_time
      t.datetime :end_time
      t.integer :report_number
      t.json :audios, null: false, default: '{}'

      t.timestamps
    end
  end
end
