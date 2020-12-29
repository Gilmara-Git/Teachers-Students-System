const db =  require("../../config/db")
const { date, graduation} =  require("../../lib/utils")

module.exports = {
//   all() {
//       try{
//     db.query(
//       `SELECT teachers.*, count(students) AS total_students
//                 FROM teachers 
//                 LEFT JOIN students ON(teachers.id = students.teacher_id)
//                 GROUP BY teachers.id
//                 ORDER BY total_students DESC`
//     );

//       }catch(error){
//           console.error(error)
//       }
//   },

 async create(data) {
    
    try {
      const query = `
    INSERT INTO teachers (
        avatar_url,
        name,
        dob,
        degree,
        delivery,
        subjects,
        created_at
   ) VALUES ($1, $2, $3, $4, $5, $6, $7)
   RETURNING id    
`;

      const values = [
        data.avatar_url,
        data.name,
        date(data.dob).iso,
        data.degree,
        data.delivery,
        data.subjects,
        date(Date.now()).iso,
      ];
      
      const results = await db.query(query, values) 

        return results.rows[0]

    } catch(error){
        console.error(error)
    }
  },

  async find(id) {

    try {
    
    const results = await db.query( ` SELECT * from teachers WHERE id = $1`, [id])
      return results.rows[0]
    
    }catch(error){
        console.error(error)
    }
    
  },

 async update(data) {

    try{
    const query = `
    
                    UPDATE teachers SET 
                        avatar_url=($1),
                        name=($2),
                        dob=($3),
                        degree=($4),
                        delivery=($5),
                        subjects=($6)
                    WHERE id = $7  
                    `;

    const values = [
      data.avatar_url,
      data.name,
      date(data.dob).iso,
      data.degree,
      data.delivery,
      data.subjects,
      data.id,
    ];

    return await db.query(query, values) 
    }catch(error){
        console.error(error)
    }
  },

  async delete(id) {

    try{

    return await db.query(`DELETE FROM teachers WHERE id= $1 `,  [id] )
    
    }catch(error){
        console.error(error)
    } 
  },

//   async findBy(filter) {

//     try{
//     const results =  await db.query(
//       `SELECT teachers.*, count(students) AS total_students
//                 FROM teachers 
//                 LEFT JOIN students ON(teachers.id = students.teacher_id)
//                 WHERE teachers.name ILIKE '%${filter}%'
//                 OR teachers.subjects ILIKE '%${filter}%'
//                 GROUP BY teachers.id
//                 ORDER BY total_students DESC`,
     
//     );

//     return results.rows

//     }catch(error){

//         console.error(error)
//     }
//   },

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
        






