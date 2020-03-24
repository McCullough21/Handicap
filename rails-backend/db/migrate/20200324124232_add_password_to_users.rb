class AddPasswordToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :password, :password_digest
  end
end
