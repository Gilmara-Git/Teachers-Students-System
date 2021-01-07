const { grade, date } = require("../../lib/utils");
//const Intl = require("intl")
const Student = require("../models/student");

module.exports = {
  async index(req, res) {

    try{
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
  }catch(error){
    console.error(error)
    return res.render('lottiePages/error.njk')
  }
  },

  async create(req, res) {
    try{
    const teacherIdName = await Student.teachersSelectOptions();
    return res.render("students/create", { teacherOptions: teacherIdName });
    }catch(error){
      console.error(error)
    }
  },

  async post(req, res) {

    try{
    
    const {
      avatar_url,name,email, dob, grade,  hours_classes, teacher_id,  } = req.body;
    
      const student = await Student.create({
      
      avatar_url,
      name,
      email,
      dob,
      grade,
      hours_classes,
      created_at: date(Date.now()).iso,
      teacher_id,
    });
    return res.render('lottiePages/createUpdate')
    //return res.redirect(`/students/${student.id}`);
  }catch(error){
    console.error(error)
    return res.render('lottiePages/error.njk')
  }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const student = await Student.find({ where: { id } });
      if (!student) return res.send("Student not found!");
      
      if(student.teacher_id === null){
        student.teacher_name = "No teacher selected yet"
      } else{      
      const teacher = await Student.studentTeacher(student.teacher_id);
      student.teacher_name = teacher.name;
      }

      student.dob = date(student.dob).birthday,
      student.created_at = date(student.created_at).format,
      student.grade = grade(student.grade);
     
    
      return res.render("students/show", { student });
    } catch (error) {
      console.error(error);
      return res.render('lottiePages/error.njk')
    }
  },

  async edit(req, res) {
    try{
    const { id } = req.params;
    const student = await Student.find({ where: { id } });
    if (!student) res.send("Student not found!.");

      (student.dob = date(student.dob).iso),
      (student.grade = grade(student.grade));

    const teacherIdName = await Student.teachersSelectOptions();
    return res.render("students/edit", { student, teacherOptions: teacherIdName, });

    }catch(error){
      console.error(error)
      return res.render('lottiePages/error.njk')
    }
  },

  async update(req, res) {
    try {
    const {
      avatar_url,
      name,
      email,
      dob,
      grade,
      hours_classes,
      teacher_id,
    } = req.body;

    await Student.update(req.body.id, {
      avatar_url,
      name,
      email,
      dob,
      grade,
      hours_classes,
      teacher_id,
    });
    return res.render('lottiePages/createUpdate')
    //return res.redirect(`students/${req.body.id}`);
  }catch(error){
    console.error(error)
    return res.render('lottiePages/error.njk')
  }
  },
  async delete(req, res) {
    try{
    await Student.delete(req.body.id);
    return res.render('lottiePages/delete')
    //return res.redirect("students");
    }catch(error){
      console.error(error)
      return res.render('lottiePages/error.njk')
    }
  }
};
