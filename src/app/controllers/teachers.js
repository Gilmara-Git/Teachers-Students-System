const { graduation, date } = require("../../lib/utils");
//const Intl = require("intl");
const Teacher = require("../models/teacher");

module.exports = {
  async index(req, res) {
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
  },
  create(req, res) {
    return res.render("teachers/create");
  },
  async post(req, res) {
    
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

    
    return res.redirect(`/teachers/${teacherId}`);
  },
  async show(req, res) {

    const { id } = req.params
    
    const teacher = await Teacher.find({where: {id}} )

    if (!teacher) return res.send("Teacher does not exist.");    

    teacher.dob = date(teacher.dob).birthday;
    teacher.subjects = teacher.subjects.split(",");
    teacher.created_at = date(teacher.created_at).format;
    teacher.degree = graduation(teacher.degree);

    return res.render("teachers/show", { teacher });
  },
  async edit(req, res) {

    const { id } = req.params
    const teacher = await Teacher.find({where: { id }});
    
    if (!teacher) res.send("Teacher not found.");

    teacher.dob = date(teacher.dob).iso;

    return res.render("teachers/edit", { teacher });
  },
  async update(req, res) {

    const { avatar_url, name, dob, degree, delivery, subjects } = req.body
    await Teacher.update(req.body.id, {
      avatar_url, 
      name, 
      dob, 
      degree, 
      delivery, 
      subjects
    });

    return res.redirect(`/teachers/${req.body.id}`);
  },
  async delete(req, res) {
    await Teacher.delete(req.body.id);

    return res.redirect("/teachers");
  },

};
