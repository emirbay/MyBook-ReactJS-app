const {User} = require('../models/user');

let auth = (req,res,next) => {
    let token = req.cookies.xauth;

    User.findByToken(token, (err,user)=> {
        if (err) throw err;
        if(!user) return res.send(false);

        req.token = token;
        req.user = user;  // user data back name, last name etc...
        next();
    })

}


module.exports = {auth}