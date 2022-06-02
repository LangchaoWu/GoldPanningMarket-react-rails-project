class UsersController < ApplicationController
    def index 
        # render json: User.all.to_json(include:[:avatar])
    
        render json: User.all ,each_serializer:UserIndexSerializer
    end 

    # GET "/users/:id"
    def show
        current_user = User.find_by(id: session[:current_user])
        # current_user = User.find_by(id: params[:id])
        # avatar = rails_blob_path(current_user.avatar)
        if current_user
            # if current_user.avatar.attached?
                # avatar = rails_blob_path(current_user.avatar)
                # user= current_user,serializer:UserSerializer
                render json:current_user,status: :ok 
                # render json: {user:current_user,avatar: avatar}, status: :ok
                # else 
                #         render json: current_user,status: :ok 
                # end
            # render json: {current_user: current_user,avatar: avatar},status: :ok
       else
           render json: {error: "user not found"} , status: :not_found
       end
    end 

    # POST "/users"
    def create
        user = User.create(user_params)
        
        if user.valid?
          
            render json: user, status: :created
        else
            render json: {error: user.errors.full_messages},status: :unprocessable_entity 
        end
    
    end 

    # PUT "/users/:id"
    def update
        user = User.find_by(id:params[:id])
        if params[:avatar]
        # user.avatar.attach(user_params)
            user.avatar.attach(params[:avatar])
        else
            user.update(user_params)
        end

          # avatar = rails_blob_path(user.avatar)
        render json:user,status: :ok
        # user.update!(user_params)
        # render json: user, status: :created
    end

    
    # DELETE "/users/:id"
    def destroy
        user = User.find(params[:id])
        user.destroy
        head :no_content
    end

    def delete_carts
        user = User.find_by(id:params[:id])
        user.carts.destroy_all
        head :no_content
    end

    private 

    def user_params
        params.permit(:username,:password,:name,:gender,:avatar)
    end 
end
