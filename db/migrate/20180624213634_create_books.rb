class CreateBooks < ActiveRecord::Migration[5.1]
  def change
    create_table :books do |t|
      t.string :rlevel
      t.string :lslevel
      t.string :age
      t.string :category
      t.string :names
      t.integer :quantity
      t.string :links
      t.string :audio
      t.text :rcomments
      t.text :bcomments

      t.timestamps
    end
  end
end
