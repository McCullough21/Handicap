class AddSlopeToCourses < ActiveRecord::Migration[6.0]
  def change
    add_column :courses, :slope, :integer
  end
end
