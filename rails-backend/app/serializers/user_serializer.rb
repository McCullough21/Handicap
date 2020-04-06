class UserSerializer
  include FastJsonapi::ObjectSerializer
  # attributes :username
 def initialize(user)
  @user = user
 end

 def serialized_user

 end
 
 def serialized_scores 
  @scores = @user.scores
  @scores.to_json(:include => {:course => {:only => [:name, :rating, :slope]}}) 
  
end
end
