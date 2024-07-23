const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const knex = require('../db/knex');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'todo_app'
});

router.get('/', function (req, res, next) {
  knex("tests")
    .select("*")
    .then(function (results) {
      console.log(results);
      res.render('index', {
        title: 'ToDo App',
        todos: results,
      });
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
      });
    });
});

router.post('/', function (req, res, next) {
  const todo = req.body.add;
  knex("tests")
  .insert({user_id: 1, content: todo})
  .then(function () {
    res.redirect('/')
  })
  .catch(function (err) {
    console.error(err);
    res.render('index', {
      title: 'ToDo App',
    });
  });
});


module.exports = router;

