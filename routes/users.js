const express = require('express');
const mgdb = require('mongoose');

const db = require('../models/db'),
    user = require('../models/user')

//Arquitectura rest(comenzamos a usar rutas)
const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.route('/')
    .get((req, resp, next) => {
        //we use the resources of model/user for connect my db at services User
        //Se va a listar a los usuarios en la bd
        mgdb.model('User').find({}, (err, users) => {
            if (err) throw err;
            resp.json(users)
        })
    })
    .post(function (req, resp) {
        //se toma información del cuerpo dele mensaje
        mgdb.model('User').create(
            req.body,
            (err, people) => {
                if (err) resp.json({ "message": 'people doesn\'t not saved' })
                console.log('saved', people)
                resp.json(people)
            })
    })

router.route('/:id')
    //usamos un meotdo de HTTP
    .get((req, resp) => {
        mgdb.model('User').findById(req.params.id, (err, user) => {
            if (err) {
                console.log("There was a problen", err)
                resp.status(405)
                resp.json({
                    "message": "Notfound!"
                })
            } else {
                console.log("Retrivieng id", req.params.id);
                resp.json(user)
            }
        })
    })
    //Update
    .put((req, resp) => {
        let name = req.body.name;
        let lastName = req.body.lastName;
        let badge = req.body.badge;

        //We use the model
        mgdb.model('User').findById(req.params.id, (err, user) => {
            //Mediante el callback revisamos si el usaurio con ekll id esta
            if (err) {
                console.log("There was a problem ", err)
                //Se retorna el codigo de estado
                resp.status(500)
                //Si hay un erro que envíe un arespuesta en un JSON
                resp.json({ "meesage": err })
            }
            else {
                user.updateOne({
                    "name": name,
                    "lastName": lastName,
                    "badge": badge
                }, (err, userid) => {
                    if (err) console.log("There was a problem ", err)
                    console.log('saved', user)
                    resp.json(user)
                })
            }
        })

    })
    .delete((req, resp) => {
        mgdb.model('User').findById(req.params.id, (err, user) => {
            //Mediante el callback revisamos si el usaurio con ekll id esta
            if (err) {
                console.log("There was a problem ", err)
                //Se retorna el codigo de estado
                resp.status(500)
                //Si hay un erro que envíe un arespuesta en un JSON
                resp.json({ "meesage": err })
            }
            else {
                user.remove((err, user) => {
                    if (err) console.log("Doesn't remove", err);
                    resp.json({
                        "message": "deleted",
                        "user": user
                    })
                })
            }
        })

    })

module.exports = router;