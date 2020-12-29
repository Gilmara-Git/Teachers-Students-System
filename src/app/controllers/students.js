
const { grade, date } = require("../../lib/utils")
//const Intl = require("intl")
const Student = require("../models/student")


module.exports = {
  async index(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit | 4;
    let offset = limit * (page - 1);

    const params = {
      filter,
      limit,
      offset,
    };
    const students = await Student.paginate(params);
    if (students == "") return res.render("students/not-found");

    const pagination = {
      page,
      total: Math.ceil(students[0].total / limit),
    };

    return res.render("students/index", { students, filter, pagination });
  },

  async create(req, res) {
    const teacherIdName = await Student.teachersSelectOptions() 
      return res.render("students/create", { teacherOptions: teacherIdName }); 
  },

 async post(req, res) {
    
    const student = await Student.create(req.body)
      return res.redirect(`/students/${student.id}`);
   
  },

  async show(req, res) {
    const student = await Student.find(req.params.id)
      if (!student) return res.send("Student does not exist");

      student.dob = date(student.dob).birthday,
      student.created_at = date(student.created_at).format,
      student.grade = grade(student.grade);

      return res.render("students/show", { student });
    
  },

 async edit(req, res) {
    const student = await Student.find(req.params.id)
      if (!student) res.send("Student does not exist.");

      student.dob = date(student.dob).iso,
      student.grade = grade(student.grade);

      const teacherIdName = await Student.teachersSelectOptions()
        console.log(teacherIdName);
        return res.render("students/edit", { student,teacherOptions: teacherIdName });
    
  },

 async update(req, res) {
   
    await Student.update(req.body)
      //console.log(req.body)
      return res.redirect(`students/${req.body.id}`);
   
  },
 async delete(req, res) {
    await Student.delete(req.body.id)
      return res.redirect("students");
    
  },
};



