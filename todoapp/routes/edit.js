const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const knex = require('../db/knex');

router.post('/', function(req, res, next) {
    const taskId = req.body.taskid;
    const userId = req.session.userid;
    const title = req.body.title;
    const detail = req.body.detail;
    const category = req.body.category;

    knex('tasks')
        .where({user_id: userId, id: taskId})
        .update({
            title: title,
            detail: detail,
            category: category
        })
        .then(function () {
            res.redirect('/');
        })
});



module.exports = router;