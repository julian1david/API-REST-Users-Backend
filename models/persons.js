const mgs = require('mongoose')
const personsSchema = new mgs.Schema({
    first_name:String,
    second_name:String,
    last_name:String,
    birth_date:String
});
mgs.model("Persons", personsSchema);