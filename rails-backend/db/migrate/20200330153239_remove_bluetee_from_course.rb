class RemoveBlueteeFromCourse < ActiveRecord::Migration[6.0]
  def change

    remove_column :courses, :bluetee, :integer
  end
end
