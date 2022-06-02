class PostSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id,
   :title, 
   :condition, 
   :category, 
   :location, 
   :description, 
   :price,
   :image_url,
   :created_at,
   :user_id
  #  :questions each_serializer: QuestionSerializer
  has_many :questions ,each_serializer: QuestionSerializer

   def image_url
     arry=[]
      object.images.each do |img|
       arry.push( rails_blob_path(img))
    end

    arry
   
  end

  def created_at
    object.created_at.to_date
  end


  
  
end
