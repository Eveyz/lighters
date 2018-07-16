class CreateTeacherStudents < ActiveRecord::Migration[5.1]
  def change
    create_table :teacher_students do |t|
      t.references :teacher, foreign_key: true
      t.references :student, foreign_key: true

      t.timestamps
    end
  end
end
