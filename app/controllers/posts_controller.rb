class PostsController < ApplicationController
    def index 
        # render json: Post.all.to_json(include: [:images] )
        render json: Post.all
    end 

    def show
        post = Post.find_by(id: params[:id])
     
  
        if post
         
            render json: post,status: :ok
            # render json: post.to_json(include: [:images] )
       else
           render json: {error: "Post not found"} , status: :not_found
       end
    end 

    def create
        post=Post.create(post_params)
        if post.valid?
            
            render json: post, status: :created
        else
            render json: {error: post.errors.full_messages},status: :unprocessable_entity 
        end    
    end

    def update
        post = Post.find_by(id:params[:id])
        if params[:images]
            # user.avatar.attach(user_params)
            post.images.attach(params[:images])
        else
            post.update(post_params)
        end
        # post.avatar.attach(post_params)
     
        # avatar = rails_blob_path(post.avatar)
        render json: post,status: :ok
        # user.update!(user_params)
        # render json: user, status: :created
    end

    def destroy
        post = Post.find_by(id:params[:id])
        if post
            post.destroy
            head :no_content
        else
            render json: {error: "post not found"} , status: :not_found
        end
        
    end

    private
    def post_params
        params.permit(:title, :condition, :category, :location,:description,:price,:user_id,images:[])
    end
end
