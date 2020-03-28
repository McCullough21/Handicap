class UsersController < ApplicationController

    
    def index
         
        user = User.find_by(username: params[:username])
        raise params.inspect
        render json: UserSerializer.new(user)

    end
end
