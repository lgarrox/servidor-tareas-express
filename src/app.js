const bodyParser = require('body-parser');
const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const { default: helmet } = require('helmet');
dotenv.config()
const app = express()

app.use(helmet());




const port = process.env.DB_PORT || 3000
app.use(bodyParser.json());
app.use('/tasks',taskRoutes);

app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Servidor activo en el puerto ${port}`)
});