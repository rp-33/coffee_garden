'use strict';

const router = require('express-promise-router')(),
	  upload =  require('../middlewares/upload'),
	  Auth = require('../middlewares/Auth');

const {
	addToCategory,
	deleteToCategory,
	editToCategory,
	findAllCategory,
	addToProduct,
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
	deleteSchool
} = require('../controllers/CtrlApp')

/* GET home page. */

router.get('/findAllCategory',findAllCategory);

router.get('/findAllProducts',findAllProducts);

/* POST home page. */

router.post('/addToCategory',addToCategory);

router.post('/addToProduct',upload.single('file'),addToProduct);

router.post('/signupSeller ',signupSeller);

router.post('/signupParent',signupParent);

router.post('/login',login);

router.post('/createRepresented',createRepresented);

router.post('/createSchool',upload.single('file'),createSchool);

/* PUT home page. */

router.put('/editToCategory',editToCategory);

router.put('/editToProduct',editToProduct);

router.put('/editImageProduct',upload.single('file'),editImageProduct);

router.put('/editAvatarUser',upload.single('file'),editAvatarUser);

/* DELETE home page. */

router.delete('/deleteToCategory',deleteToCategory);

router.delete('/deleteToProduct',deleteToProduct);

router.delete('/deleteRepresented',deleteRepresented);

router.delete('/deleteSchool',deleteSchool);

module.exports = router;
