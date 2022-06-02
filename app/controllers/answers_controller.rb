class AnswersController < ApplicationController
    def index 
        render json: Answer.all
    end

    def create
        answer=Answer.create(answer_params)
        if answer.valid?
            
            render json: answer, status: :created
        else
            render json: {error: answer.errors.full_messages},status: :unprocessable_entity 
        end    
    end
    

    private
    def answer_params
        params.permit(:answer, :question_id)
    end
end
