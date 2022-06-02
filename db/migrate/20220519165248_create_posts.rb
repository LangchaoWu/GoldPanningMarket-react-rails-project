class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :title
      t.string :condition
      t.string :category
      t.string :location
      t.string :description
      t.float :price

      t.timestamps
    end
  end
end
