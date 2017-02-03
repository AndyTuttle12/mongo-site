var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var mongoConnectUrl = "mongodb://localhost:27017/dcclass";
var db;

mongoClient.connect(mongoConnectUrl, (error, database)=>{
	db = database;
});

/* GET home page. */
router.get('/', function(req, res, next) {
	db.collection('students').find({}).toArray((error, studentResults)=>{
		console.log(studentResults);
		res.render('index', { students: studentResults });
	});	
});

router.get('/addNew', (req, res, next)=>{
	res.render('addNew', {});
});

router.post('/addNew', (req, res, next)=>{
	var newStudentName = req.body.newStudentName;
	db.collection('students').insertOne({
		name: newStudentName,
		cohortDate: 2017
	});
	res.redirect('/');
});

router.post('/removeStudent', (req, res, next)=>{
	var removeStudentName = req.body.removeStudentName;
	db.collection('students').deleteOne({
		name: removeStudentName
	});
	res.redirect('/');
});

module.exports = router;
