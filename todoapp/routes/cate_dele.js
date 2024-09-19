const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const knex = require('../db/knex');

router.post('/', function (req, res, next) {
    const name = req.body.category_name;

    knex('tasks')
        .where('category', name)
        .select("*")
        .del()
        .then(function () {
            knex("tabs")
                .where("name", name)
                .select("*")
                .del()
                .then(function () {
                    res.redirect("/");
                })
                .catch(function (err) {
                    console.error(err);
                });
        })
});

module.exports = router;