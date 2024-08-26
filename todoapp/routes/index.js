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
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  console.log(`isAuth: ${isAuth}`);


  knex("tasks")
    .select("*")
    .then(function (results) {
      console.log(results);
      res.render('index', {
        title: 'ToDo App',
        todos: results,
        isAuth: isAuth,
      });
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
        isAuth: isAuth,
      });
    });
});

router.post('/', function (req, res, next) {
  const title = req.body.title;
  const detail = req.body.detail;
  const userId = req.session.userid;

  console.log('Title:', title);
  console.log('Detail:', detail);
  console.log('User ID:', userId);

  knex("tasks")
  .insert({user_id: userId, title: title, detail: detail})
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

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));

module.exports = router;

