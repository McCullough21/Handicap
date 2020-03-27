# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



Course.create(name: "Mayacoo Lakes Country Club", rating: 71.8, goldtee: 149, bluetee: 145, whitetee: 139)
Course.create(name: "Mirasol", rating: 70.6, goldtee: 147, bluetee: 142, whitetee: 136)

User.create(username: :Michael, password: "hockey")