const db = require('../../config/db');
const { date, graduation } = require('../../lib/utils')
const Teacher = require('../models/teacher')
const Student = require('../models/student')



function checkAllfields(body){

    const keys = Object.keys(body);
    for(let key of keys){
        if(body[key]==""){
          
          return { 
            error : "Please fill out all fields!!",
            teacher: body
        }
    }
}
}


 function post(req, res, next){ 

    const fieldsInBlank = checkAllfields(req.body)
    if(fieldsInBlank) return res.render("teachers/create", fieldsInBlank )
    
    next()
    }


    function update(req, res, next){ 

        const fieldsInBlank = checkAllfields(req.body)
        if(fieldsInBlank) return res.render("teachers/edit", fieldsInBlank);
        next()
    }

    async function remove(req, res, next){

        const { id } = req.body
       
        const teacherHasStudent = await Student.ifTeacherHasStudents(id)
        console.log('teacher length', teacherHasStudent.length)
        

        if(teacherHasStudent.length != 0){
        const teacher = await Teacher.find({where: {id}} )  
        teacher.dob = date(teacher.dob).birthday;
        teacher.subjects = teacher.subjects.split(",");
        teacher.created_at = date(teacher.created_at).format;
        teacher.degree = graduation(teacher.degree);
        return res.render("teachers/show", { 
            teacher, 
            error: "Teacher has students and cannot be deleted!" 
        }) 

    }
           
            next() 

    }

module.exports = { 

    post, update, remove
}
