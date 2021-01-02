const db = require('../../config/db')


const Base = {
  init({ table }) {
      try{
    if (!table) throw new Error("Invalid table params passed to the Base!");
    this.table = table;
    return this;
      }catch(error){
          console.log(error)
      }
  },
  async find(filters) { //{where: {id}}
       
    try {
    let query = `SELECT * FROM ${this.table}`;
        
    if(!filters){ // in case I need to bring all teachers/students    
        const results = await db.query(query);
        return results.rows;

    }else{
      Object.keys(filters).map((key) => {
        query += ` ${key}`;

        Object.keys(filters[key]).map((field) => {
          query += ` ${field} = '${filters[key][field]}'`;
        });
      });
    }
      const results = await db.query(query);
      return results.rows[0];
    } catch (error) {
      console.error(error);
    }
  },
  async create(fields) { //fields are coming destructered from controller
    console.log('fields for resource creation',fields)
    try {
      let keys = [],
        values = [];

      Object.keys(fields).map((key) => {
        keys.push(key);
        values.push(`'${fields[key]}'`);
      });

      const query = `INSERT INTO ${this.table}
                    (${keys.join(",")})
                    VALUES
                    (${values.join(",")})
                    RETURNING id`

      const results = await db.query(query);
      return results.rows[0].id;
    } catch (error) {
      console.error(error);
    }
  },
  update(id, fields) { //fields are coming destructered from controller
    try{      
      let update = []

      Object.keys(fields).map(key=>{
          const lines = `${key} = '${fields[key]}'`
          update.push(lines)

      })


      let query = `UPDATE ${this.table} SET
                    ${update.join(',')}
                    WHERE id = ${id}`

             
       return db.query(query)               

    }catch(error){
        console.error(error)
    }
  },
  async delete(id) {
    
    try{

    return await db.query(`DELETE FROM ${this.table} WHERE id= $1 `,[id] )
    
    }catch(error){
        console.error(error)
    } 
  }
  
};
module.exports =  Base 
 