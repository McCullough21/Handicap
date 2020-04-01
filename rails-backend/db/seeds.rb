# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


mike = User.create(username: :Michael, password: "hockey")

Course.create(name: "Mayacoo Lakes Country Club", rating: 71, slope: 149)
Course.create(name: "Mirasol", rating: 70, slope: 146)

mike.scores.create(total: 76, course_id: 1)
mike.scores.create(total: 83, course_id: 2)
mike.scores.create(total: 85, course_id: 2)
mike.scores.create(total: 72, course_id: 1)
mike.scores.create(total: 87, course_id: 2)
mike.scores.create(total: 77, course_id: 1)
mike.scores.create(total: 75, course_id: 1)
mike.scores.create(total: 78, course_id: 2)