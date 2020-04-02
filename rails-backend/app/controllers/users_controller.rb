class UsersController < ApplicationController

    def create
        raise params.inspect
    end

    def show
        
        @user = User.find_by(username: params[:username])
        if @user && @user.authenticate(params[:password])
            render json: UserSerializer.new(@user).serialized_scores
        end

    end
end
