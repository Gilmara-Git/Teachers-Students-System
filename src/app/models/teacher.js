const db =  require("../../config/db")
const { date } =  require("../../lib/utils")
const Base = require('./base')

Base.init({table:"teachers"})


module.exports = {

... Base,
 
 async paginate(params) {

    try {
    const { filter, limit, offset} = params;

    let query = "",
      filterQuery = "",
      totalQuery = `
                    (SELECT COUNT(*) from teachers) AS total`;

    if (filter) {
      filterQuery = `
                    WHERE teachers.name ILIKE '%${filter}%'
                    OR teachers.subjects ILIKE '%${filter}%'`;

      totalQuery = `(
                      SELECT COUNT(*) from teachers
                      ${filterQuery} ) AS total`;
    }

    query = `   
                    SELECT teachers.*, ${totalQuery}, COUNT(students) AS total_students
                    FROM teachers
                    LEFT JOIN students ON (students.teacher_id = teachers.id) 
                    ${filterQuery}   
                    GROUP BY teachers.id                       
                    ORDER BY total_students DESC
                    limit $1 
                    OFFSET $2   `;

    const results  = await db.query(query, [limit, offset]) 
        return results.rows
    }catch(error){

        console.error(error)
    }
    
  },
};
        






