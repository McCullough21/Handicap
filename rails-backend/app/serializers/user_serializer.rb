class UserSerializer
  include FastJsonapi::ObjectSerializer
  # attributes :username
 def initialize(user)
  @user = user
 end

 def serialized_user
  @user.to_json(:only => [:username, :id])
 end

 def serialized_scores 
  @scores = @user.scores
  @scores.to_json(:include => {:course => {:only => [:name, :rating, :slope]}, 
  :user => {:only => [:username, :id]}}) 
  
end
end
