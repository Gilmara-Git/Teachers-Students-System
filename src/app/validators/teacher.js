
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

module.exports = { 

    post, update
}
