class CreateTeachers < ActiveRecord::Migration[5.1]
  def change
    create_table :teachers do |t|
      t.string :firstname
      t.string :lastname
      t.string :englishname
      t.integer :age
      t.date :birthday
      t.string :gender
      t.string :city
      t.string :work
      t.string :education
      t.text :experience
      t.text :otherexperience
      t.integer :profour
      t.integer :proeight
      t.integer :levelsix
      t.string :other
      t.string :honor
      t.text :interaction
      t.string :like
      t.integer :availabletime
      t.string :audio
      t.text :comments
      t.string :resume
      t.string :status, null: false, default: "pending"
      t.json :certificates, null: false, default: '{}'
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
