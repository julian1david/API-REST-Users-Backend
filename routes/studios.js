const express = require("express");
const mgdb = require("mongoose");

const db = require("../models/db"),
      studios = require("../models/studios");

const router = express.Router();  /// para crea una API con estructura modular

router.use(express.json()); /// express mantega JSON como notacion de intercambio
router.use(express.urlencoded({extended:true})); /// express obtenga los params

router.route("/")
    .get(function(req, resp, next){
        mgdb.model("Studios").find({}, (err, movies)=>{
            if(err){
                resp.status(500);
                resp.json({
                    "messsage":"There was problem."
                })
            }else{
                resp.json(movies);
            }
        })
    })
    .post(function(req, resp){
        let name = req.body.name
        let year_founded = req.body.year_founded
        let qty_movies = req.body.qty_movies
        let headquartes = req.body.headquartes

        mgdb.model("Studios").create({
            "name":name,
            "year_founded":year_founded,
            "qty_movies":qty_movies,
            "headquartes":headquartes,
        }, (err, a_studio) => {
            if(err){
                resp.status(500);
                resp.json({
                    "messsage":"There was problem."
                });
            }else{
                resp.json(a_studio)
            }
        })
    });

router.route("/:id")
    .get(function(req, resp){
        mgdb.model("Studios").findById(req.params.id, (err, a_studio)=>{
            if(err) resp.json({"message":"There was problem"});
            if(a_studio){
                resp.json(a_studio);
            }else{
                resp.status(404);
                resp.json({"message":"Not found"});
            }
        });
    })
    .put(function(req, resp){
        let name = req.body.name
        let year_founded = req.body.year_founded
        let qty_movies = req.body.qty_movies
        let headquartes = req.body.headquartes

        mgdb.model("Studios").findById(req.params.id, (err, a_studio)=>{
            if(err) resp.json({"message":"There was problem"});
            if(a_studio){
                a_studio.updateOne({
                    "name":name,
                    "year_founded":year_founded,
                    "qty_movies":qty_movies,
                    "headquartes":headquartes,
                }, (err, id)=>{
                    if(err) resp.json({"message":"Studio has not updated"});
                    resp.json({
                        message:"Studio has been updated.",
                        _id:a_studio._id
                    })
                })
            }else{
                resp.status(404);
                resp.json({"message":"Not found"});
            }
        });
    })
    .delete(function(req, resp){
        mgdb.model("Movies").findById(req.params.id, (err, a_studio)=>{
            if(err) resp.json({"message":"There was problem"});
            if(a_studio){
                a_studio.remove((err, id)=>{
                    if(err) resp.json({"message":"Studio has not deleted"});
                    resp.json({
                        message:"Studio has been deleted."
                    })
                })
            }else{
                resp.status(404);
                resp.json({"message":"Not found"});
            }
        });
    });

module.exports = router;
