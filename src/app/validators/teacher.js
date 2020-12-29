
function checkAllfields(body){

    const keys = Object.keys(body);
    for(let key of keys){
        if(body[key]==""){
          const error = "Please, fill out all fiels!"
          return { 
              error: error,
              body
        }
    }
}
}


 function post(req, res, next){ 

    const fieldsInBlank = checkAllfields(req.body)
    if(fieldsInBlank) return res.send("Fill all lines")
    
    next()
    }


    function update(req, res, next){ 

        const fieldsInBlank = checkAllfields(req.body)
        if(fieldsInBlank) return res.send("Fill all lines, this is the update")
        next()
    }

module.exports = { 

    post, update
}
