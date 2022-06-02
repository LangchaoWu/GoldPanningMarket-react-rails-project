class SessionsController < ApplicationController
    # Group Activity => Set 'authorize_user' to Skip Login Action

    def login
        user = User.find_by(username:params[:username]) 
        
        if user&.authenticate(params[:password])

            # Group Activity => 
                # - Set Session's 'current_user' to User's ID
                session[:current_user] = user.id
                # - Set Session's 'login_attempts' to 0
                # session[:login_attempts] = 0 
                # if user.avatar.attached?
                #     avatar = rails_blob_path(user.avatar)
                #     render json: {user:user,avatar: avatar}, include:[:posts],status: :ok
                # else 
                #     render json: {user:user},include:[:posts],status: :ok 
                # end

                render json:user,status: :ok
        else

            # # Group Activity =>
            #     # - Set Session's 'login_attempts' to 0 if Undefined / Falsey
            #     session[:login_attempts] ||= 0
             
            #     # - Increment Session's 'login_attempts' by 1
            #     session[:login_attempts] += 1

            render json: { error: "Invalid Password and/or Username"},  status: :unauthorized
        end
    end 

    def get_current_user
        current_user = User.find_by(id: session[:current_user])
        # avatar = rails_blob_path(current_user.avatar)
        # render json: {user:current_user,avatar: avatar}
        # if current_user.avatar.attached?
        #     avatar = rails_blob_path(current_user.avatar)
        #     render json: {user:current_user,avatar: avatar}, include:[:posts],status: :ok
        # else 
        #     render json: {user:current_user},include:[:posts],status: :ok 
        # end
        render json: current_user ,status: :ok
        
    end

    def logout
        session.delete :current_user
    end 
end
