class UserSerializer
  include FastJsonapi::ObjectSerializer
  # attributes :username
 def initialize(user)
  @user = user
 end

 def serialized_scores 
    
  @scores = @user.scores
  @user.to_json(:include => {:scores => {:only => [:total]}}) 
  # {@scores => {:only => [:total]},
  # :course => {:only => [:name, :rating, :slope]}})
end
end
