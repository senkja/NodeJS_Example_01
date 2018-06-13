// Beemeljük a mongoose modult.
var mongoose = require('mongoose');

// Csatlakozunk az adatbázishoz.
try {
  mongoose.connect('mongodb://localhost/test');  
} catch ( e ) {
  console.log( "Error establishing connect to database: ", e );
}

// Új model beállítása az adatbázis dokumentumokhoz.
var Product = mongoose.model('Product',
    {
        name: "String",
        price: "Number",
        manufacturer: "String",
        image: "String",
        instock: "Number"
    });

// Egy dokumentum lekérése.
var getOne = function( where, callBack ) {

  Product.findOne( where, function( err, docs ) {
    callBack( docs );
  } );

};

// Összes dokumentum lekérése.
var getAll = function( where, callBack ) {

  Product.find( where, function( err, docs ) {
    callBack( docs );
  } );

};


// Dokumentum frissítése.
var update = function( where, data, callBack ) {

//  console.log( 'args', arguments );

  Product.update( where, data, function(err) {
    if (err) {
      callBack( {"error": err} );
    } else {
      callBack( data );      
    }
  });

};

// Új dokumentmum létrehozása.
var insert = function( data, callBack ) {

  var product = new Product( data );
  product.save(function (err) {
    if (err) {
        callBack( {"error": err} );
    } else {
      callBack( data );      
    }
  });

};

// Dokumentum törlése.
var remove = function( where, callBack ) {
  // {age: {$gt:40}
  Product.remove( where, function(err, resp) {
     if ( !err ) {
        callBack( {"msg": "torolve"} );      
     } else {
        callBack( {"error": err} );
     }
  });

};


// Dokumentum sum
var getCount = function( where, callBack ) {

  Product.count( where, function( err, resp ) {
    callBack( resp );
  } );
};


module.exports = {
  "getOne": getOne,
  "getAll": getAll,
  "update": update,
  "insert": insert,
  "remove": remove,
  "count": getCount
};












