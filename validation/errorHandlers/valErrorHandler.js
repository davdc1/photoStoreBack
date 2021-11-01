const valErrorHandler = function(err, req, res, next){
    //console.log('err:', err.error.details[0].message);
    let errors = []
    
    err.error.details.forEach(error => {
        errors.push(error.message);
    });

    console.log("errors::", errors)

    res.status(400);
    res.end({errors});
}

module.exports = valErrorHandler;