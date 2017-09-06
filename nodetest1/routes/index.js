var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

router.get('/userlist', function(req, res) {
  console.log(collection);
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

router.get('/addBatchUser2', function(req, res) {
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect('mongodb://localhost:27017/nodetest1', function(err, db) {
    // Get the collection
    var listOfObjects = [];
    for(var i = 1; i < 100; i++) {
      var userObj = {}
      userObj['username'] = "userName"+i;
      userObj['email'] = "userEmail"+i;
      if(i%10==0){
        console.log(listOfObjects);
        var col = db.collection('usercollection');
        col.insertMany(listOfObjects).then(function(r) {
        console.log(r.insertedCount);
      });
    }else{
        listOfObjects.push(userObj);
    }
  }
  db.close();
  });
});

/* POST to Add Multiple Batched User */
router.get('/addBatchUser', function(req, res) {

    // Set our internal DB variable

    //var db = req.db;
    var i =1;
    //var collection = db.get('usercollection');
    // Get our form values. These rely on the "name" attributes
    var listOfObjects = [];
    for(i = 10; i < 100; i++) {
      var userObj = {}
      userObj['username'] = "userName"+i;
      userObj['email'] = "userEmail"+i;
      if(i%10==0){
        console.log(listOfObjects);
        console.log(colle zaction.find());
        db.get('usercollection').insertMany( listOfObjects, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // And forward to success page
                res.redirect("userlist");
            }
        });
        listOfObjects = [];
      }else{
        listOfObjects.push(userObj);
      }

    }
    db.close();


    // Set our collection


    // Submit to the DB

});

module.exports = router;
