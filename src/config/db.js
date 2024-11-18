const {Pool} = require("pg");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();
 
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    
    ssl:{
        rejectUnauthorized:true,
        ca:fs.readFileSync('./src/certs/ca.crt').toString()
    }
});


// Verificar Conexcion 

pool.connect((error,client,release)=>{
    if(error){
        console.log("ERROR DE CONEXION :(",error.stack)
    }else{
        console.log("conexion exitosa")
        release()
    }

})


module.exports=pool