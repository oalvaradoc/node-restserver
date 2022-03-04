// module.exports = Categoria = require('./categoria')
// module.exports = Role = require('./roles')
// module.exports = Server = require('./server')
// module.exports = User = require('./users')

//Tambien funciona 
// module.exports = {
// ...
// ...

// }

const Categoria = require('./categoria');
const Role = require('./roles');
const Server = require('./server');
const User = require('./users');
const Producto = require('./producto');



module.exports = {
    Categoria,
    Producto,
    Role,
    Server,
    User,
}


