const mgdb = require('mongoose')
const dotenv = require('dotenv').config()

mgdb.connect(`mongodb://${process.env.HOST}:${process.env.DB_PORT}/${process.env.BD_NAME}`,(err, db)=>{
    //usamos una promesa
    if(err) throw err;
    if(process.env.NODE_ENV !== "production") console.log("Success ! Database conected")
});
