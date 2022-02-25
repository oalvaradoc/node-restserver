
const mongoose = require('mongoose');


const dbConecction = async() => {
    try {

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex : true,
            //useFindAndModify:false
        } );

        console.log('Base de datos online')

    } catch (error) {
        console.log('Error en DB: ' + error);
        throw new Error('Error en la base de datos');
    }

}

module.exports = {
    dbConecction
}