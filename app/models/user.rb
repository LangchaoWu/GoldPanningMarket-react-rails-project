class User < ApplicationRecord
    has_secure_password
    
   

   

    validates :username, presence: true, uniqueness: true
    validates :name, presence: true, uniqueness: true
    validates :gender,presence: true
    has_many :posts ,dependent: :destroy
    
    has_one_attached :avatar


    # def avatar_url
    #     Rails.application.routes.url_helpers.url_for(avatar) if avatar.attached?
    # end
end
