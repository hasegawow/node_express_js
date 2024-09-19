const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const knex = require('../db/knex');

router.post('/', function(req, res, next){
    const category = req.body.category;
    const userId = req.session.userid;
    const isAuth = Boolean(userId);
    console.log(`isAuth: ${isAuth}`);

    knex("tasks")
        .where({ category:category })
        .select("*")
        .then(function(tasks) {
            knex("tabs")
                .select("*")
                .then(function (tabs) {
                    res.render("index", {
                        tasks: tasks,
                        tabs: tabs,
                        isAuth: isAuth,
                        title: 'Just do it !!',
                    })
                })
        })
    })


module.exports = router;