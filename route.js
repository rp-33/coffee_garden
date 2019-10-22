module.exports ={

    config : (express,app)=>{

        var path = require('path');
    
        app.use(express.static(path.join(__dirname,'public')));
        app.get('/*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
        });

    }
  
}
