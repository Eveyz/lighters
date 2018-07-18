class CreateReportKeywords < ActiveRecord::Migration[5.1]
  def change
    create_table :report_keywords do |t|
      t.string :content
      t.references :report, foreign_key: true

      t.timestamps
    end
  end
end
