const express = require("express");
const mgdb = require("mongoose");

const db = require("../models/db"),
    movies = require("../models/movies"),
    persons = require("../models/persons");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route("/")
    .get(function (req, resp, next) {
        mgdb.model("Movies").find({ "enable": 1 }, (err, movies) => {
            if (err) {
                resp.status(500);
                resp.json({
                    "messsage": "There was problem."
                })
            } else {
                resp.json(movies);
            }
        })
    })
    .post(function (req, resp) {
        let title = req.body.title
        let director_id = req.body.director_id
        let release_year = req.body.release_year
        let actors = req.body.actors
        let votes = req.body.votes

        mgdb.model("Movies").create({
            "title": title,
            "director_id": director_id,
            "release_year": release_year,
            "actors": actors,
            "votes": votes,
        }, (err, a_movie) => {
            if (err) {
                resp.status(500);
                resp.json({
                    "messsage": "There was problem."
                });
            } else {
                //con esto recorremos el arreglo de personas
                actors.forEach((a_person) => {
                    mgdb.model("Persons").create({
                        "first_name": a_person.first_name,
                        "second_name": a_person.second_name,
                        "last_name" : last_name,
                        "birth_date": a_person.birth_date
                    }, (err, a_person) => {
                        if (err) console.log("Error ", err);
                    })
                });
                resp.json(a_movie)
            }
        })
    });

router.route("/:id")
    .get(function (req, resp) {
        mgdb.model("Movies").findById(req.params.id, (err, a_movie) => {
            if (err) resp.json({ "message": "There was problem" });
            if (a_movie) {
                resp.json(a_movie);
            } else {
                resp.status(404);
                resp.json({ "message": "Not found" });
            }
        });
    })
    .put(function (req, resp) {
        let title = req.body.title
        let director_id = req.body.director_id
        let release_year = req.body.release_year
        let actors = req.body.actors
        let votes = req.body.votes
        let enable = req.body.enable

        mgdb.model("Movies").findById(req.params.id, (err, a_movie) => {
            if (err) resp.json({ "message": "There was problem" });
            if (a_movie) {
                a_movie.updateOne({
                    "title": title,
                    "director_id": director_id,
                    "release_year": release_year,
                    "actors": actors,
                    "votes": votes,
                    "enable": enable,
                }, (err, id) => {
                    if (err) resp.json({ "message": "Movie has not updated" });
                    resp.json({
                        message: "Movie has been updated.",
                        _id: a_movie._id
                    })
                })
            } else {
                resp.status(404);
                resp.json({ "message": "Not found" });
            }
        });
    })
    .delete(function (req, resp) {
        mgdb.model("Movies").findById(req.params.id, (err, a_movie) => {
            if (err) resp.json({ "message": "There was problem" });
            if (a_movie) {
                a_movie.updateOne({
                    "enable": 0
                }, (err, id) => {
                    if (err) resp.json({ "message": "Movie has not deleted" });
                    resp.json({
                        message: "Movie has been deleted."
                    })
                });
            } else {
                resp.status(404);
                resp.json({ "message": "Not found" });
            }
        });
    });


module.exports = router;