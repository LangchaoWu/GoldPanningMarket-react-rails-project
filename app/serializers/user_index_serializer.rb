class UserIndexSerializer < ActiveModel::Serializer

  attributes :id, :username, :password_digest, :gender, :name
  has_many :posts


 

end
