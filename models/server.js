const express = require('express')
var cors = require('cors');
const { dbConecction } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar:'/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            users:'/api/users'
        }
        //this.usersPath = '/api/users';
        //this.authPath = '/api/auth';

        this.conectDB();
        ////Midelware
        this.middlewares();

        this.routes();
    }

    async conectDB(){
        await dbConecction();
    }

    middlewares(){
        this.app.use(cors());

        this.app.use( express.json() );

        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use( this.paths.users, require('../routes/users'));
        this.app.use( this.paths.buscar, require('../routes/buscar'));
        this.app.use( this.paths.categorias, require('../routes/categorias'));
        this.app.use( this.paths.productos, require('../routes/productos'));
        this.app.use( this.paths.auth, require('../routes/auth'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port)
        })
    }

}

module.exports = Server;