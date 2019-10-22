module.exports ={

    config : (express,app)=>{

    var path = require('path');
    
    app.use(express.static(path.join(__dirname,'client', 'build')));
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
}
