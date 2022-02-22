const express = require('express')
var cors = require('cors')

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        ////Midelware
        this.middlewares();

        this.routes();
    }

    middlewares(){
        this.app.use(cors());

        this.app.use( express.json() );

        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use( this.usersPath, require('../routes/users'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port)
        })
    }

}

module.exports = Server;