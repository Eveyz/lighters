class CreateCourses < ActiveRecord::Migration[5.1]
  def change
    create_table :courses do |t|
      t.integer :teacher_id
      t.integer :student_id
      t.string :name
      t.string :level
      t.integer :capacity
      t.string :code
      t.string :type
      t.string :status, null: false, default: "active"

      t.timestamps
    end
  end
end
