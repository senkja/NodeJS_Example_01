// Beemeljük a mongoose modult.
var mongoose = require('mongoose');

// Csatlakozunk az adatbázishoz.
mongoose.connect('mongodb://localhost/test');

// Adott collection törlése.
// mongoose.connection.db.dropCollection('foo', function(err, result) {...});

// Új model beállítása az adatbázis dokumentumokhoz.
var User = mongoose.model('User',
    {
        name: "String",
        email: "String",
        age: "Number",
        address: "String"
    });

/*
// Dokumentum frissítése.
User.update( {age: {$eq:40} }, {name: 'Elder Finn'}, function(err) {
    if ( err ) console.log( err );
    else console.log( "updated" );
});
*/

/*
// Új dokumentmum létrehozása.
var tom = new User({ name: 'Huckleberry Finn', email:'huckleberry.finn@gmail.com', age: 42, address: "Mississippi river road 12." });
tom.save(function (err) {
  if (err) {
      console.log( "Error while saving data: ", err );
  }
  console.log('save done');
});
*/

// Dokumentum törlése.
User.remove( {age: {$gt:40} }, function(err, resp) {
   if ( !err ) {
       console.log( "Törölve" );
   } else {
       console.log( "Hiba: ", err );
   }
});













