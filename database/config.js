const mongoose = require('mongoose');
require("dotenv").config();

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true

        });

        console.log("Base de datos en linea");

    } catch (error) {
        console.log(error);
        throw new Error("Error a la hora de iniciar la BD")
    }

}

module.exports = {
    dbConnection
}