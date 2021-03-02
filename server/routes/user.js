const express = require('express');
const router = express.Router();

//MODELS
const {User} = require('../models/user');

//MIDDLEWARE
const {auth} = require('../middleware/auth');


router.post('/register', (req,res)=> {
    const user = new User(req.body);

    user.save((err,doc)=>{
        //if(err) return res.json({err});
        if(err) return res.json({success:false});
        res.status(200).json({
            success: true,
            user:doc
        })
    })

    //console.log('It works user 1');
    // res.status(200).send({response:"ok", test: 123});
})


router.post('/login', (req,res)=> {
    User.findOne({'email':req.body.email}, (err,user)=> {
        if(!user) return res.json({
            auth:false,
            message: 'Auth failes, email not found!',
            userData:false
        });

        user.comparePasswords(req.body.password, (err,isMatch)=> {
            if(!isMatch) return res.json({
                auth:false,
                message: 'Wrong password!',
                userData:false
            });

            user.generateToken((err,user)=>{
                if(!isMatch) return res.status(400).send(err);

                res.cookie('xauth',user.token).json({
                    auth:true,
                    userData: {
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        lastname: user.lastname
                    }
                })   


            });  
        })
    })
 
});

//
router.get('/auth',auth, (req,res) => {
    res.json({
        auth: true,
        userData: {
            id: req.user._id,
            email: req.user.email,
            name: req.user.name,
            lastname: req.user.lastname
             // we dont want to pass password and token
        }

    })

});

router.get('/logout',auth, (req,res)=> {
   req.user.deleteToken(req.token,(err,user)=>{
      if (err) return res.status(400).send(err);

       res.status(200).send('Bye')
    })

 
});




module.exports = router;