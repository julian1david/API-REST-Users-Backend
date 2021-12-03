const mgs = require("mongoose");

const studiosSchema = new mgs.Schema({
    name:String,
    year_founded:String,
    qty_movies:Number,
    headquartes:String
});
mgs.model("Studios", studiosSchema);