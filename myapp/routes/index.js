var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var productsHandler = require( '../model/products' );
    var products_sum = {'count': 0};
    var users_sum = {'count': 0};
    productsHandler.count( {}, function(data) {
      products_sum = {'count': data};
    });
    var usersHandler = require( '../model/users' );
    usersHandler.count( {}, function(data) {
      users_sum = {'count': data};
    });
    res.render('index', { title: 'Dashboard', products_sum: products_sum, users_sum: users_sum  });
});

/* GET products listing. */
router.get('/products', function(req, res, next) {
    var productsHandler = require( '../model/products' );
    productsHandler.getAll({}, function(data) {
      res.render('products', {title: 'Products', products: data})
    });
});


router.get('/orders', function(req, res, next) {
    res.render('orders', { title: 'Orders' });
});


router.get('/users', function(req, res, next) {
//    res.render('users', { title: 'Users' });
    var usersHandler = require( '../model/users' );
    usersHandler.getAll({}, function(data) {
      if (!data) data = [];
      res.render('users', {title: 'Users', users: data})
    });
  
});


var productFields = [
  {'label': 'Name', 'name': 'name'},
  {'label': 'Price', 'name': 'price'},
  {'label': 'Manufacturer', 'name': 'manufacturer'},
  {'label': 'In Stock', 'name': 'instock'},
  {'label': 'Image', 'name': 'image'}

];


var userFields = [
  {'label': 'Name', 'name': 'name'},
  {'label': 'E-mail', 'name': 'email'},
  {'label': 'Gender', 'name': 'gender'},
  {'label': 'Address', 'name': 'address'},
  {'label': 'Role', 'name': 'meta', 'sub': 'role'},
  {'label': 'Last Login', 'name': 'meta', 'sub': 'lastLogin'}
];




/* GET new products. */
router.get('/products/new', function(req, res, next) {
  res.render('product_new', {title: 'New Product', formFields: productFields});
});


/* POST new product*/
router.post('/product/save-new', function(req, res, next) {
  var productsHandler = require( '../model/products' );
  productsHandler.insert( req.body, function(data) {
        res.redirect('/products');        
    } );
})



/* Update product. */
router.post('/products/update/:id', function(req, res, next) {
//     console.log( req.body );
    var productsHandler = require( '../model/products' );
    productsHandler.update( {'_id': req.params.id}, req.body, function(data) {
//        res.redirect('/products/'+req.params.id);             
        res.redirect('/products');             
    } );
    
});


router.get('/products/delete/:id', function(req, res) {
    var productsHandler = require( '../model/products' );
    productsHandler.remove( {'_id': req.params.id}, function(data) {
      res.redirect('/products');             
  
    });
});


/* GET one product. */
router.get('/products/:id', function(req, res, next) {
    var productsHandler = require( '../model/products' );
    productsHandler.getOne( {'_id': req.params.id}, function(data) {
        res.render('product', { data: data });       
    } );
});



router.post('/users/update/:id', function(req, res, next) {
    var usersHandler = require( '../model/users' );
    usersHandler.update( {'_id': req.params.id}, req.body, function(data) {
        res.redirect('/users');             
    } );
    
});


router.get('/users/delete/:id', function(req, res) {
    var usersHandler = require( '../model/users' );
    usersHandler.remove( {'_id': req.params.id}, function(data) {
      res.redirect('/users');             
  
    });
});


/* GET one user's datas */
router.get('/users/:id', function(req, res, next) {
    var usersHandler = require( '../model/users' );
  
  //lehet igy is, ez kitorli a meta objektumot!!!!!
//  var fields = usersHandler.template;
//  delete fields.meta;
  //
  //
  
    usersHandler.getOne( {'_id': req.params.id}, function(data) {
        res.render('user', {title: data.name, data: data, userFields: userFields});       
    } );
});



module.exports = router;
