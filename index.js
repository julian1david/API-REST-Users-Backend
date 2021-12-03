const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const host = process.env.HOST || 'localhost'
//Con el cors contralamos quienes pueden hacer peticiones a nuestro servidor
const cors = require('cors')
app.use(cors({origin:"*"}))

//Acces to routes
const userRoutes = require('./routes/users')
const personsRoutes = require("./routes/persons");
const moviesRoutes = require("./routes/movies");
const studiosRoutes = require("./routes/studios");

//we use a endpoit
app.use("/persons", personsRoutes);
app.use("/studios", studiosRoutes);
app.use("/movies", moviesRoutes);
app.use('/api/teachers', userRoutes);
app.use('/api/students', userRoutes);
app.use('/api/tutors', userRoutes);

app.get('/',(req, resp) => {
    resp.json({
        "message": "pong"
    })
})

const server = app.listen(port,()=>{
    if(process.env.NODE_ENV !== "production") console.log('app-web-02  listening at ',host, port)
})
