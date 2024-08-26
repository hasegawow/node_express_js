const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
    res.render('logout', {
        title: 'ログアウトしました。'
    });
});

module.exports = router;