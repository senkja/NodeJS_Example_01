// Mongoose.
var mongoose = require( "mongoose" );
var User= require('../model/users');


try {
  mongoose.connect('mongodb://localhost/test');  
} catch ( e ) {
  console.log( "Error establishing connect to database: ", e );
}

// Session model.
var Session = mongoose.model( "Session", {
    "userId": "String",
    "sessionID": "String",
    "inDate": "Date",
    "outDate": "Date"
} );


// User model.
/*
var User = mongoose.model( "User", {
    email: "String",
    password: "String"
} );
*/


// Get valid session.
var getSession = function( req, callBack ) {
    var where = { 
                  "sessionID": req.sessionID,
                  "outDate": null
                };
    Session.findOne( where, function( err, session ) {
        if ( err ) callBack( err );
        else {
          if (session)
          {  
            User.getOne( {"_id": session.userId}, function( user ) {
              session.userName = user.name;
              callBack( false, session );
            });
          }
          //ide is kell callback!!!!
          else
              callBack( true, session );
        }
    } );
};

// Login user.
var loginUser = function( req, callBack ) {
    var where = {
      "email": req.body.email,
      "password": req.body.password
    };
    //
    User.getOne( where, function( user ) {
        if (!user) {
          callBack( true, user );
        } else {
          user.meta.lastLogin = new Date();
          User.update({"_id": user._id}, user, function (err) {
            var _session = new Session( {
                "userId": user._id,
                "sessionID": req.sessionID,
                "inDate": new Date(),
                "outDate": null
            } );
            _session.save();
            callBack( false, user );
          });
        }
    } );
  
};




//Log out
var logoutUser = function( req, callBack ) {
  var where = {
    "sessionID": req.sessionID,
    "outDate": null
  };
  var data = {outDate: new Date()};
  Session.update(where, data, function (err) {
    callBack();
  }); 
};



module.exports = {
    "getSession": getSession,
    "loginUser": loginUser,
    "logoutUser": logoutUser,
};





