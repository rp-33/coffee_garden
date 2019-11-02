var config = {
	server:{
		port : 80
	},
 	db:{
 		port: 'mongodb+srv://rp352429:rp352429@cluster0-psfrv.mongodb.net/test?retryWrites=true&w=majority'
 	},
 	token :{
 		secret : 'coffee_garden_954395164264495_DYJ0jReUd3Ufhp5VAaPEzNL9aCA_'
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