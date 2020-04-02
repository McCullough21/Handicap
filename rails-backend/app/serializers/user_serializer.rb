class UserSerializer
  include FastJsonapi::ObjectSerializer
  # attributes :username
 def initialize(user)
  @user = user
 end

def serialized_scores 
    
      @scores = @user.scores
      @scores.to_json(:include => {:user => {:only => [:username]},
      :course => {:only => [:name, :rating, :slope]}})
  end
end
