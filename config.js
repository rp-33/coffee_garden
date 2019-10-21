var config = {
	server:{
		port : process.env.PORT || 8888
	},
 	db:{
 		port:'mongodb://coffee_garden:pillow8nic@ds127429.mlab.com:27429/heroku_kmv2jg40'
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