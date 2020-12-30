const db =  require("../../config/db")
const { date, graduation} =  require("../../lib/utils")
const Base = require('./base')

Base.init({table: "students"})

module.exports = {
  ...Base,

  async update(data) {
    console.log(data);

    try {
      const query = `    
        UPDATE students SET 
        avatar_url=($1),
        name=($2),
        email=($3),
        dob=($4),
        grade=($5),
        hours_classes=($6),
        teacher_id =($7)
        WHERE id = $8  
                    `;

      const values = [
        data.avatar_url,
        data.name,
        data.email,
        date(data.dob).iso,
        data.grade,
        data.hours_classes,
        data.teacher,
        data.id,
      ];

      return await db.query(query, values);
    } catch (error) {
      console.error(error);
    }
  },

  async delete(id) {
    try {
      return await db.query(`DELETE FROM students WHERE id= $1 `, [id]);
    } catch (error) {
      console.error(error);
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

//   async findBY(filter) {
//     //console.log(filter)
//     try {
//       let query = `SELECT * 
//                     FROM students   
//                     ORDER BY students.name ASC`;

//       const queryFilter = `WHERE students.name ILIKE '%${filter}%'
//                          OR students.email ILIKE '%${filter}%'  `;

//       if (filter) {
//         query = `SELECT * 
//                 FROM students 
//                 ${queryFilter}  
//                 ORDER BY students.name ASC
//                     `;
//       }

//       const results = await db.query(query);
//       return results.rows;

//     } catch (error) {
//       console.error(error);
//     }
//   },

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




