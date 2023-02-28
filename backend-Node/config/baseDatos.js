const mongoose = require('mongoose');

const connectDataBase = async () => {
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conectado a la base");
    } catch (error) {
        console.log("Error al conectar a la base", error);
    }
}
mongoose.set('strictQuery', false);

module.exports=connectDataBase;