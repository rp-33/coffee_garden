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
	signupParent,
	login,
	createRepresented,
	deleteRepresented,
	createSchool,
	deleteSchool,
	findAllSchool
} = require('../controllers/CtrlApp')

/* GET home page. */

router.get('/findAllCategory',findAllCategory);

router.get('/findAllProducts',findAllProducts);

router.get('/findAllSchool',Auth,findAllSchool);

/* POST home page. */

router.post('/createCategory',createCategory);

router.post('/createProduct',upload.single('file'),createProduct);

router.post('/signupSeller ',signupSeller);

router.post('/signupParent',signupParent);

router.post('/login',login);

router.post('/createRepresented',createRepresented);

router.post('/createSchool',upload.single('file'),createSchool);

/* PUT home page. */

router.put('/editCategory',editCategory);

router.put('/editToProduct',editToProduct);

router.put('/editImageProduct',upload.single('file'),editImageProduct);

router.put('/editAvatarUser',upload.single('file'),editAvatarUser);

/* DELETE home page. */

router.delete('/deleteCategory',deleteCategory);

router.delete('/deleteToProduct',deleteToProduct);

router.delete('/deleteRepresented',deleteRepresented);

router.delete('/deleteSchool',Auth,deleteSchool);

module.exports = router;
