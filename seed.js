const faker  = require('faker')
const Teacher = require('./src/app/models/teacher')
const Student = require('./src/app/models/student');
const { date } = require('./src/lib/utils');

let teachers = [],
teachersIds = []
const totalTeachers = 10;
let degree = []
degree.push("H", "A", "B", "M", "D" )
let delivery = []
delivery.push("E","P")


let students = []
const totalStudents = 5;

let grade = []
grade.push("5", "6", "7", "8", "9", "10", "11", "12")


//console.log(delivery.length)
//const random = delivery[Math.floor(Math.random() * delivery.length)]
//console.log(random)

async function createTeachers(){

    while(teachers.length < totalTeachers ){
        teachers.push({
            avatar_url: faker.image.image(),
            name: faker.name.firstName(),
            dob: date(faker.date.past()).iso,
            degree: degree[Math.floor(Math.random() * degree.length)],
            delivery:delivery[Math.floor(Math.random() * delivery.length)],
            subjects: faker.random.words(),
            created_at: date(Date.now()).iso
        })
    }
   

   const teachersPromise = teachers.map(teacher=>Teacher.create(teacher))
   teachersIds = await Promise.all(teachersPromise)
   
   
}

async function createStudents(){

    while(students.length < totalStudents){
        console.log(totalStudents)
        students.push({
            avatar_url: faker.image.image(),
            name: faker.name.firstName(),
            email:faker.internet.email(),
            dob: date(faker.date.past()).iso,
            grade: grade[Math.floor(Math.random() * grade.length )],
            hours_classes:faker.random.number(40),
            created_at: date(Date.now()).iso,
            teacher_id: teachersIds[Math.floor(Math.random()* totalTeachers)],
        })

        
        const studentsPromise = students.map(student=> Student.create(student))
        const allStudents = await Promise.all(studentsPromise)
        //console.log('allstudents', allStudents)

    }
}


async function resourcesCreation(){
    
    await createTeachers()
    await createStudents()

}

resourcesCreation()