var config = {
	server:{
		port : 80
	},
 	db:{
 		port:'mongodb://coffee_garden:pillow8nic@ds127429.mlab.com:27429/heroku_kmv2jg40'
 	},
 	token :{
 		secret : 'coffee_garden'
 	},
 	cloudinary : {
		name : 'coffe-garden',
		key : '954395164264495',
		secret : 'DYJ0jReUd3Ufhp5VAaPEzNL9aCA'
	},
	application: {
  		controllers: {
    		default: 'index',
    		current: ''
  		}
 	}
};

module.exports = config;