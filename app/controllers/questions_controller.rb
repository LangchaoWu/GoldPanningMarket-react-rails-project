class QuestionsController < ApplicationController
    def index 
        # render json: Post.all.to_json(include: [:images] )
        render json:Question.all
    end 

    def create
        question=Question.create(question_params)
        if question.valid?
            
            render json: question, status: :created
        else
            render json: {error: question.errors.full_messages},status: :unprocessable_entity 
        end    
    end


    private
    def question_params
        params.permit(:question, :post_id)
    end
end
