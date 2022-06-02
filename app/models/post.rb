class Post < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :category,presence:true
  validates :location,presence:true
  validates :price,presence:true
  has_many :questions, dependent: :destroy
 

  has_many_attached :images,dependent: :purge_later
end
