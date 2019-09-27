'use strict';

const router = require('express-promise-router')(),
	  upload =  require('../middlewares/upload'),
	  Auth = require('../middlewares/Auth');

const {
	createCategory,
	deleteCategory,
	editCategory,
	findAllCategory,
	createProduct ,
	deleteToProduct,
	editToProduct,
	findAllProducts,
	editImageProduct,
	signupSeller,
	editAvatarUser,
	signup,
	login,
	createRepresented,
	deleteRepresented,
	createSchool,
	deleteSchool,
	findAllSchool,
	editNameSchool,
	editAvatarSchool,
	saveOrder,
	findBalance,
	saveRepresented,
	findAllRepresented,
	findAllOrders,
	findAllRepresentative,
	addBalance,
	findAllOrdersUser,
	queryUser
} = require('../controllers/CtrlApp')

/* GET home page. */

router.get('/findAllCategory',findAllCategory);

router.get('/findAllProducts',findAllProducts);

router.get('/findAllSchool',findAllSchool);

router.get('/findBalance',findBalance);

router.get('/findAllRepresented',Auth,findAllRepresented);

router.get('/findAllOrders',Auth,findAllOrders);

router.get('/findAllRepresentative',Auth,findAllRepresentative);

router.get('/findAllOrdersUser',Auth,findAllOrdersUser);

router.get('/queryUser',Auth,queryUser);

/* POST home page. */

router.post('/createCategory',createCategory);

router.post('/createProduct',upload.single('file'),createProduct);

router.post('/signupSeller ',signupSeller);

router.post('/signup',signup);

router.post('/login',login);

router.post('/createSchool',upload.single('file'),createSchool);

router.post('/saveOrder',Auth,saveOrder);

router.post('/saveRepresented',Auth,saveRepresented);

/* PUT home page. */

router.put('/editCategory',editCategory);

router.put('/editToProduct',editToProduct);

router.put('/editImageProduct',upload.single('file'),editImageProduct);

router.put('/editAvatarUser',upload.single('file'),editAvatarUser);

router.put('/editNameSchool',editNameSchool);

router.put('/editAvatarSchool',upload.single('file'),editAvatarSchool);

router.put('/addBalance',Auth,addBalance);

/* DELETE home page. */

router.delete('/deleteCategory',deleteCategory);

router.delete('/deleteToProduct',deleteToProduct);

router.delete('/deleteRepresented',Auth,deleteRepresented);

router.delete('/deleteSchool',Auth,deleteSchool);

module.exports = router;
