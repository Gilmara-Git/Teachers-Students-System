const faker  = required('faker')
let teachers = []
let totalTeachers = 10;

let degree = [ ]
degree.push("H", "A", "B", "M", "D" )


async function createTeachers(){

    while(teachers.length < totalTeachers ){

        teachers.push({
            avatar_url: faker.image.avatar,
            name: faker.name.firstName,
            dob: faker.date.past,
            degree,
            delivery,
            subjects,
            created_at: date(Date.now()).iso
        })
    }
   return teachers
}
const result = createTeachers()
console.log(result)


