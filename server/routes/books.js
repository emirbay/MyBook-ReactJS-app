const express = require('express');
const router = express.Router();
//models
const {Book} = require('../models/books');
const {auth} = require('../middleware/auth');

// /api/books/book

router.route('/book')
.get((req,res)=> {
    let id = req.query.id;
    // traži sve
    // Book.find({_id: id},(err,doc)=>{
    //     if (err) return res.status(400).send(err);
    //     res.send(...doc);  // doc - vraća array objekata, ... samo jedan objekt
    // })

    Book
    .find({_id: id})
    .populate('ownerId','name lastname') // columns to populate
    .exec((err,doc)=>{
        if (err) return res.status(400).send(err); //err or false
        res.send(...doc);   
    })
})
.post(auth,(req,res)=> {
    const book = new Book({
        ...req.body,
        ownerId: req.user._id
    });

    book.save((err,doc)=> {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            bookId: doc._id
        })
    })

})
.patch(auth,(req,res)=> {
    Book.findByIdAndUpdate(req.body._id, req.body, {new:true}, (err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json({success: true,
                  doc
                });
    
    })
})
.delete(auth,(req,res)=> {
    let id = req.query.id;

    Book.findByIdAndRemove(id,(err,doc)=> {
        if(err) return res.status(400).send(err);
        res.json(true);
    })
})

// /api/books/all  ?skip=1&limit=3&order=asc&owner=authorname
router.route('/all')
.get((req,res)=> {
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;  // ako postoji parametar postavimo, ako ne default 0
    let limit = req.query.limit ? parseInt(req.query.limit) : 100; 
    let order = req.query.order ?  req.query.order : 'asc'; 
    let byOwner = req.query.owner ?  {ownerId: req.query.owner} : {}; 

    Book.find().skip(skip).sort({_id: order}).limit(limit).exec((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })

})

module.exports = router;