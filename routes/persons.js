const express = require("express");
const mgdb = require("mongoose");

const db = require("../models/db"),
    persons = require("../models/persons");

const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.route("/")
    .get((req, resp, next) => {
        mgdb.model("Persons").find({}, (err, people) => {
            if (err) throw err;
            resp.json(people)
        })
    })
    .post(function (req, resp) {
        let first_name = req.body.first_name;
        let second_name = req.body.second_name;
        let last_name = req.body.last_name;
        let birth_date = req.body.birth_date;

        mgdb.model("Persons").create({
            "first_name": first_name,
            "second_name": second_name,
            "last_name" : last_name,
            "birth_date": birth_date
        }, (err, people) => {
            if (err) resp.json({ "message": "people does not saved" });
            console.log("saved ", people);
            resp.json(people);
        })
    });

router.route("/:id")
    .get(function (req, resp) {
        mgdb.model("Persons").findById(req.params.id, (err, person) => {
            if (err) {
                console.log("There was a problem", err);
            } else {
                console.log("Retrieving id ", req.params.id);
                resp.json(person)
            }
        })
    })
    .put(function (req, resp) {
        let first_name = req.body.first_name;
        let second_name = req.body.second_name;
        let last_name = req.body.last_name;
        let birth_date = req.body.birth_date;

        mgdb.model("Persons").findById(req.params.id, (err, person) => {
            if (err) {
                console.log("There was a problem ", err);
                resp.status(500);
                resp.json({ "message": err });
            } else {
                person.updateOne({
                    "first_name": first_name,
                    "second_name": second_name,
                    "last_name" : last_name,
                    "birth_date": birth_date
                }, (err, peopleid) => {
                    if (err) console.log("There was a problem ", err)
                    resp.json({
                        "_id": person._id,
                        "message": "Person has been updated."
                    })
                })
            }
        })
    })
    .delete(function (req, resp) {
        mgdb.model("Persons").findById(req.params.id, (err, person) => {
            if (err) {
                console.log("There was a problem ", err);
                resp.status(500);
                resp.json({
                    "message": "There was a problem "
                })
            } else {
                person.remove((err, people) => {
                    if (err) console.log("Does not remove");
                    resp.json({
                        "message": "Person has been deleted",
                        "people": person
                    })
                })
            }
        })
    })


module.exports = router;