class CoursesController < ApplicationController
    def index
        @course = Course.all 
        render json: CourseSerializer.new(@course)
    end
end
