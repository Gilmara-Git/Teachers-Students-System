const db =  require("../../config/db")
const { date, graduation} =  require("../../lib/utils")
const Base = require('./base')

Base.init({table: "students"})

module.exports = {
  ...Base,

  async studentTeacher(id){

    try{

      const results = await db.query(`SELECT teachers.name from teachers where id = ${id}`)

      return results.rows[0]

    }catch(error){
      console.error(error)
    }
},

  async teachersSelectOptions() {
    try {
      const results = await db.query(`SELECT id, name FROM teachers`);
      return results.rows;
    } catch (error) {
      console.error(error);
    }
  },

  async paginate(params) {
    try {
      const { filter, limit, offset } = params;

      let query = "",
        queryFilter = "",
        totalquery = `
                    (SELECT COUNT(*) AS total from students) AS total                 
        `;

      if (filter) {
        queryFilter = `
                        WHERE students.name ILIKE '%${filter}%'
                        OR students.email ILIKE '%${filter}%'  `;

        totalquery = `
                        (SELECT COUNT(*) AS total
                        FROM students 
                        ${queryFilter} ) AS total
`;
      }

      query = `SELECT * from students, ${totalquery}
                    ${queryFilter}
                    ORDER BY students.name ASC
                    LIMIT $1
                    OFFSET $2 

        `;

      const results = await db.query(query, [limit, offset]);

      return results.rows;
    } catch (error) {
      console.error(error);
    }
  },
};




