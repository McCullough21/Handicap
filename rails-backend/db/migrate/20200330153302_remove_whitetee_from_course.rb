class RemoveWhiteteeFromCourse < ActiveRecord::Migration[6.0]
  def change

    remove_column :courses, :whitetee, :integer
  end
end
