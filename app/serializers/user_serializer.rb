class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :username, :password_digest, :gender, :name ,:avatar
  has_many :posts

  # def avatar
  #     rails_blob_path(avatar , only_path: true) if object.avatar.attached?
  # end

  def avatar
    if object.avatar.attached?
      return rails_blob_path(object.avatar)
    else
      return ""
    end
  end
  

  
end
