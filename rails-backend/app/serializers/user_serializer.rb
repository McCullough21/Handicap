class UserSerializer
  include FastJsonapi::ObjectSerializer
  # attributes :username
 def initialize(user)
  @user = user
 end

  def serialized
    
      @user.to_json(:include => {:scores => {:only => [:id, :total, :course_id, :created_at, :updated_at]}})
       
  end
end
