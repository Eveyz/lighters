class CreateBooks < ActiveRecord::Migration[5.1]
  def change
    create_table :books do |t|
      t.string :rlevel
      t.string :lslevel
      t.string :age
      t.string :category
      t.string :serials
      t.string :name
      t.integer :quantity
      t.string :audio
      t.string :file
      t.string :cover
      t.text :rcomments
      t.text :bcomments
      t.json :files, null: false, default: '{}'
      t.string :keywords, array: true

      t.timestamps
    end
  end
end
