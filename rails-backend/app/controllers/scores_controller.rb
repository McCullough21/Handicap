class ScoresController < ApplicationController
    # will need to create scores
    # figure out routes if any are needed
    
    def create
        
        @score = Score.create(total: params[:total], course_id: params[:course_id], user_id: params[:user_id])
    end
end
