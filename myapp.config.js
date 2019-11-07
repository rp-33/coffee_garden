module.exports = {
    apps : [{
      name        : "myapp",
      script      : "sudo node server.js",
      watch       : true,
      env: {
        "NODE_ENV": "development",
      },
      env_production : {
       "NODE_ENV": "production"
      }
    }]
}