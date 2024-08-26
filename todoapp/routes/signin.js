const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
    res.render('signin', {
    title: 'Sign in',
    errorMessage: '',
    });
});

router.post('/', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    knex("users2")
        .where({
            name: username,
            password: password,
        })
        .select("*")
        .then(function(results) {
            if (results.length === 0) {
                res.render("signin", {
                    title: "Sign in",
                    errorMessage: "ユーザが見つかりません",
                });
            } else {
                req.session.userid = results[0].id;
                res.redirect('/');
            }
        })
        .catch(function (err) {
            console.error(err);
            res.render("signin", {
                title: "Sign in",
                errorMessage: err.sqlMessage,
                isAuth: false,
            });
        });
});

module.exports = router;