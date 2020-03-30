class UserSerializer
  include FastJsonapi::ObjectSerializer
  # attributes :username
 def initialize(user)
  @user = user
 end

  def serialized 
      @user.to_json(:except => [:created_at, :updated_at]) 
      @scores = @user.scores
      @scores.to_json(:include => {:course => {:only => [:name]}})
  end
end
