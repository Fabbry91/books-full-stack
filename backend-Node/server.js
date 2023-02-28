const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const connectDataBase = require('./config/baseDatos');

//creo la variable del config
dotenv.config({ path: './config/config.env' });
//conect Base
connectDataBase();

const app = express();
app.use(express.json());

//delaro el puerto
const PORT = process.env.PORT || 5000;

// esto me aplica morgan solo en el entorno de desarrollo
(process.env.NODE_ENV === 'development') ? app.use(morgan('dev')) : null;

// aplica las rutas declarada en la carperta routes
app.use('/api/Libro', require('./routes/librosRoutes'));
app.use('/api/Autor', require('./routes/autorRuta'));


const server = app.listen((PORT), () => {
    console.log('servidor en hambiente ', process.env.NODE_ENV);
});


//en caso de error on process cierra o no permite la ejecucion del servidor
process.on('unhandledRejection',(err,promise)=>{
    server.close(()=>process.exit(1))
})