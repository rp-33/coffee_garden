module.exports ={

    config : (express,app)=>{

    var path = require('path');
    
    if (process.env.NODE_ENV === 'production') {
   
        app.use(express.static(path.join(__dirname,'client', 'build')));
        app.get('/*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });

    }else{
        app.use(express.static('client/public'));
        app.get('/', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
        });
    }

    }
  
}
