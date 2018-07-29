class CreateReports < ActiveRecord::Migration[5.1]
  def change
    create_table :reports do |t|
      t.integer :teacher_id
      t.integer :course_id
      t.integer :student_id
      t.string :type
      t.string :course_date
      t.integer :duration
      t.integer :focus
      t.string :tutor_comment
      t.string :homework
      t.string :future_book
      t.string :start_time
      t.string :end_time
      t.integer :report_number
      t.json :review, null: false, default: '{}'
      t.json :content, null: false, default: '{}'
      t.json :links, null: false, default: '{}'
      t.json :audios, null: false, default: '{}'
      t.string :keywords, array: true

      t.timestamps
    end
  end
end
