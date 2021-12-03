const mgs = require('mongoose')

//Declarmos como va a ser el documento de movies
const moviesSchema = new mgs.Schema({
    title: String,
    director_id: String,
    realease_year: String, 
    actors:[],
    votes: Number,
    enable: Number
})

mgs.model("Movies", moviesSchema);
