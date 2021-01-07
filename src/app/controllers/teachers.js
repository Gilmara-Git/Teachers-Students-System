const { graduation, date } = require("../../lib/utils");
//const Intl = require("intl");
const Teacher = require("../models/teacher");

module.exports = {
  async index(req, res) {

    try {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 4;
    let offset = limit * (page - 1);

    const params = { filter, limit, offset };

    let teachers = await Teacher.paginate(params);
    if (teachers == "") return res.render("teachers/not-found");

    teachers = teachers.map((teacher) => {
      newTeacher = {
        ...teacher,
        subjects: teacher.subjects.split(","),
      };

      return newTeacher;
    });

    const pagination = {
      page,
      total: Math.ceil(teachers[0].total / limit),
    };
    
    return res.render("teachers/index", { teachers, filter, pagination });
  }catch(error){
    console.error(error)
  }
  },
  create(req, res) {
    return res.render("teachers/create");
  },
  async post(req, res) {
    try{
    const { avatar_url, name, dob, degree, delivery, subjects } = req.body
        
    const teacherId = await Teacher.create({
        avatar_url,
        name,
        dob,
        degree,
        delivery,
        subjects,
        created_at: date(Date.now()).iso
    });
    
    return res.render('lottiePages/createUpdate')

  }catch(error){
    console.error(error)
    return res.render('lottiePages/error.njk')
    
  }
  },
  async show(req, res) {

    try {
    const { id } = req.params
    
    const teacher = await Teacher.find({where: {id}} )

    if (!teacher) return res.send("Teacher does not exist.");    

    teacher.dob = date(teacher.dob).birthday;
    teacher.subjects = teacher.subjects.split(",");
    teacher.created_at = date(teacher.created_at).format;
    teacher.degree = graduation(teacher.degree);

    return res.render("teachers/show", { teacher });
    }catch(error){
      console.error(error)
      return res.render('lottiePages/error.njk')
    }
  },
  async edit(req, res) {
    try{
    const { id } = req.params
    const teacher = await Teacher.find({where: { id }});
    
    if (!teacher) res.send("Teacher not found.");
    teacher.dob = date(teacher.dob).iso;

    return res.render("teachers/edit", { teacher });
    }catch(error){
      console.error(error)
      return res.render('lottiePages/error.njk')
    }
  },
  async update(req, res) {
    try{
    const { avatar_url, name, dob, degree, delivery, subjects } = req.body
    await Teacher.update(req.body.id, {
      avatar_url, 
      name, 
      dob, 
      degree, 
      delivery, 
      subjects
    });

    return res.render('lottiePages/createUpdate')
  }catch(error){
    console.error(error)
    return res.render('lottiePages/error.njk')
  }
  },
  async delete(req, res) {
    try {
    await Teacher.delete(req.body.id);

    return res.render('lottiePages/delete')
    }catch(error){
      console.error(error)
      return res.render('lottiePages/error.njk')
    }
  },

};
