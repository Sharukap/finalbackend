const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Students = require('../models/students');
const adminRouter = express.Router();
adminRouter.use(bodyParser.json());

adminRouter.route('/')

.get((req,res,next) => {
    Students.find({})
    .then((students) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(students);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Students.create(req.body)
    .then((student) => {
        console.log('Student record created', student);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(student);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end("PUT Operation not supported on /students");

})

.delete((req, res, next) => {
    res.statusCode = 403;
    res.end("Not allowed to delete all records at once");
});

adminRouter.route('/:studentId')
.get((req,res,next) => {
    Students.findById(req.params.studentId)
    .then((student) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(student);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Cannot create a student record with'+ req.params.studentId+'Do not include an ID when creating a new record');
})

.put((req, res, next) => {
    Students.findByIdAndUpdate(req.params.studentId,{
        $set: req.body
    },{new: true })
    .then((student)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(student);
    }, (err)=>next(err))
    .catch((err)=> next(err));
})

.delete ((req, res, next) => {
    Students.findByIdAndRemove(req.params.studentId, function (err, resp) { 
	if (err) throw err;
        res.json();
    });
});

module.exports = adminRouter;
