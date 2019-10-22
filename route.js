module.exports ={

    config : (express,app)=>{

    var path = require('path');
    
    if (process.env.NODE_ENV === 'production') {
   
        app.use(express.static('./public'));
        app.get('/*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
        });

    }else{
        app.use(express.static('./public'));
        app.get('/*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
        });
    }

    }
  
}