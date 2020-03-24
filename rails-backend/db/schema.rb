# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_03_24_124232) do

  create_table "courses", force: :cascade do |t|
    t.string "name"
    t.integer "goldtee"
    t.integer "bluetee"
    t.integer "whitetee"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "rating"
  end

  create_table "scores", force: :cascade do |t|
    t.integer "total"
    t.integer "user_id", null: false
    t.integer "course_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["course_id"], name: "index_scores_on_course_id"
    t.index ["user_id"], name: "index_scores_on_user_id"
  end

# Could not dump table "users" because of following StandardError
#   Unknown type 'password_digest' for column 'password'

  add_foreign_key "scores", "courses"
  add_foreign_key "scores", "users"
end
