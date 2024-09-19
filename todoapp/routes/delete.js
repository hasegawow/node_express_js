const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const knex = require('../db/knex');

router.post('/', function (req, res, next) {
    const id = req.body.id;

    knex('tasks')
        .where('id', id)
        .del()
        .then(function () {
            res.redirect('/');
        })
        .catch(function (err) {
            console.error(err);
        });
});

module.exports = router;