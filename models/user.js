const mgdbs =  require("mongoose")
//Create a new database
const nameSchema = new mgdbs.Schema({
    title:String,
    first:String,
    last:String
})

const idSchema = new mgdbs.Schema({
    type : String,
    value: String
})

const pictureSchema = new mgdbs.Schema({
    large : String, 
    medium: String,
    thumbnail: String
})

const  userSchema = new mgdbs.Schema({
    id: idSchema,
    name: nameSchema,
    gender: String,
    email: {
        type:String,
        required: true
    },
    type: String,
    phone: String,
    cell: String,
    nat: String,
    birth_date: String,
    picture: pictureSchema,
    

})

mgdbs.model("User", userSchema)