class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :questions do |t|
      t.string :question
      t.belongs_to :post, null: false, foreign_key: true

      t.timestamps
    end
  end
end
