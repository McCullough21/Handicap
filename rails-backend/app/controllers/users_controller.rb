class UsersController < ApplicationController

    
    def show
        
        user = User.find_by(username: params[:username])
        
        render json: UserSerializer.new(user)

    end
end
