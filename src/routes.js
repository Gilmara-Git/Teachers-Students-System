const express = require('express')
const routes = express.Router()
const teachers = require("./app/controllers/teachers")
const TeacherValidator = require('./app/validators/teacher')
const StudentValidator = require('./app/validators/student')
const students = require("./app/controllers/students")

routes.get('/', function (req, res){

    return res.redirect("/teachers")

})

routes.get('/teachers', teachers.index)
routes.get("/teachers/create", teachers.create)
routes.post("/teachers", TeacherValidator.post, teachers.post)
routes.get("/teachers/:id", teachers.show)
routes.get("/teachers/:id/edit", teachers.edit )
routes.put("/teachers", TeacherValidator.update, teachers.update) //put
routes.delete("/teachers", TeacherValidator.remove, teachers.delete) // working on it


routes.get('/students', students.index)
routes.get("/students/create", students.create)
routes.post("/students", StudentValidator.post, students.post)
routes.get("/students/:id", students.show)
routes.get("/students/:id/edit", students.edit )
routes.put("/students", students.update) //put
routes.delete("/students", students.delete) // working on it

module.exports = routes