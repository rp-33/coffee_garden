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
	editAvatarUser,
	signup,
	login,
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
	queryUser,
	createSeller,
	findAllSeller,
	deleteSeller,
	queryOrder,
	packOffOrder,
	findAllHistory,
	deleteProduct,
	saveShopping,
	changeVip,
	findAllShopping,
	queryShoppingDay,
	createVoucherPayment,
	findAllMyVoucher,
	findAllVoucher,
	paymentVoucher,
	findUser,
	editCi,
	editEmail,
	editNames,
	editPassword,
	editPhone
} = require('../controllers/CtrlApp')

/* GET home page. */

router.get('/findAllCategory',findAllCategory);

router.get('/findAllProducts',findAllProducts);

router.get('/findAllSchool',findAllSchool);

router.get('/findBalance',Auth,findBalance);

router.get('/findAllRepresented',Auth,findAllRepresented);

router.get('/findAllOrders',Auth,findAllOrders);

router.get('/findAllRepresentative',Auth,findAllRepresentative);

router.get('/findAllOrdersUser',Auth,findAllOrdersUser);

router.get('/queryUser',Auth,queryUser);

router.get('/findUser',Auth,findUser);

router.get('/findAllSeller',Auth,findAllSeller)

router.get('/queryOrder',Auth,queryOrder);

router.get('/findAllHistory',Auth,findAllHistory);

router.get('/findAllShopping',Auth,findAllShopping);

router.get('/queryShoppingDay',Auth,queryShoppingDay);

router.get('/findAllMyVoucher',Auth,findAllMyVoucher);

router.get('/findAllVoucher',Auth,findAllVoucher);

/* POST home page. */

router.post('/createCategory',Auth,createCategory);

router.post('/createProduct',upload.single('file'),createProduct);

router.post('/signup',signup);

router.post('/login',login);

router.post('/createSchool',Auth,upload.single('file'),createSchool);

router.post('/saveOrder',Auth,saveOrder);

router.post('/saveRepresented',Auth,saveRepresented);

router.post('/createSeller',Auth,createSeller);

router.post('/saveShopping',Auth,saveShopping);

router.post('/packOffOrder',Auth,packOffOrder);

router.post('/createVoucherPayment',Auth,upload.single('file'),createVoucherPayment);

/* PUT home page. */

router.put('/editCategory',Auth,editCategory);

router.put('/editToProduct',Auth,editToProduct);

router.put('/editImageProduct',upload.single('file'),editImageProduct);

router.put('/editAvatarUser',upload.single('file'),editAvatarUser);

router.put('/editNameSchool',editNameSchool);

router.put('/editAvatarSchool',upload.single('file'),editAvatarSchool);

router.put('/addBalance',Auth,addBalance);

router.put('/changeVip',Auth,changeVip);

router.put('/paymentVoucher',Auth,paymentVoucher);

router.put('/editCi',Auth,editCi);

router.put('/editEmail',Auth,editEmail);

router.put('/editNames',Auth,editNames);

router.put('/editPassword',Auth,editPassword);

router.put('/editPhone',Auth,editPhone);

/* DELETE home page. */

router.delete('/deleteCategory',Auth,deleteCategory);

router.delete('/deleteToProduct',deleteToProduct);

router.delete('/deleteRepresented',Auth,deleteRepresented);

router.delete('/deleteSchool',Auth,deleteSchool);

router.delete('/deleteSeller',Auth,deleteSeller);

router.delete('/deleteProduct',Auth,deleteProduct);

module.exports = router;
