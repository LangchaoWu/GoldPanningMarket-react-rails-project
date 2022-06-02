class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :question,:answers
 

  def answer
    object.answers
  end
end
