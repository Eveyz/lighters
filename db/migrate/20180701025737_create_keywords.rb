class CreateKeywords < ActiveRecord::Migration[5.1]
  def change
    create_table :keywords do |t|
      t.string :content
      t.references :book, foreign_key: true

      t.timestamps
    end
  end
end
