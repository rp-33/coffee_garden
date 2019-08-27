var config = {
	server:{
		port : process.env.PORT || 8888
	},
 	db:{
 		port: process.env.MONGODB_URI || 'mongodb://localhost/coffee_garden'
 	},
 	token :{
 		secret : 'coffee_garden'
 	},
 	cloudinary : {
		name : 'dcds5nieu',
		key : '294112599459225',
		secret : '7phKXXkkvlDUTwWfSW28tFa6k_Q'
	},
	application: {
  		controllers: {
    		default: 'index',
    		current: ''
  		}
 	}
};

module.exports = config;