class CreateCourses < ActiveRecord::Migration[6.0]
  def change
    create_table :courses do |t|
      t.string :name
      t.integer :goldtee
      t.integer :bluetee
      t.integer :whitetee

      t.timestamps
    end
  end
end
