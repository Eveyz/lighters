class CreateStudents < ActiveRecord::Migration[5.1]
  def change
    create_table :students do |t|
      t.string :pphone
      t.string :pemail
      t.string :pwechat
      t.string :pqq
      t.string :firstname
      t.string :lastname
      t.string :englishname
      t.integer :age
      t.string :birthday
      t.string :gender
      t.string :city
      t.string :schoolname
      t.string :schoolstatus
      t.string :level
      t.string :time
      t.string :estimate
      t.string :expectation
      t.text :paragraph
      t.string :dailyreading
      t.string :currentreadingstatus
      t.string :penglishlevel
      t.string :custody
      t.string :way
      t.string :reason
      t.string :status
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
