const faker  = require('faker')
//onst Teacher = require('./src/models/teacher')

let teachers = [],
teachersIds = []
let totalTeachers = 10;
let degree = []
degree.push("H", "A", "B", "M", "D" )
let delivery = []
delivery.push("E","P")


let students = [],
totalStudents = 5;

let grade = []
grade.push("5", "6", "7", "8", "9", "10", "11", "12")


console.log(delivery.length)
const random = delivery[Math.floor(Math.random() * delivery.length)]
console.log(random)

async function createTeachers(){

    while(teachers.length < totalTeachers ){
        teachers.push({
            avatar_url: faker.image.image(),
            name: faker.name.firstName(),
            dob: faker.date.past(),
            degree: degree[Math.floor(Math.random() * degree.length)],
            delivery:delivery[Math.floor(Math.random() * delivery.length)],
            subjects: faker.random.words(),
            created_at: faker.date.recent()
        })
    }
   

   const teachersPromise = teachers.map(teacher=>Teacher.create(teacher))
   teachersIds = await Promise.all(teachersPromise)
   
}

async function createStudents(){

    while(students.length < totalStudents){
        students.push({
            avatar_url: faker.image.image(),
            name: faker.name.firstName(),
            email:faker.internet.email(),
            dob: faker.date.past(),
            grade: grade[Math.floor(Math.random() * grade.length )],
            hours_classes:faker.random.number(40),
            created_at: faker.date.recent(),
            teacher_id: teacherIds[Math.floor(Math.random()* totalTeachers)],
        })

    
        const usersPromise = students.map(student=> Student.create(student))
        const users = await Promise.all(usersPromise)

    }
}





// function resourcesCreation(){
    
//      createTeachers()
//      createStudents()

// }
