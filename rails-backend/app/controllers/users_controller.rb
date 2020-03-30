class UsersController < ApplicationController

    def index
        user = User.find_by(id: params[:id])
        
    
        render json: UserSerializer.new(user).serialized_scores
    end

    def show
        
        @user = User.find_by(username: params[:username])
        if @user && user.authenticate(params[:password])
        render json: @user.serialized
        end

    end
end
