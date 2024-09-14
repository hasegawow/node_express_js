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
    .then(function (tasks) {
      knex("tabs")
        .select("*")
        .then(function (tabs) {
          res.render('index', {
            tasks: tasks,
            tabs: tabs,
            isAuth: isAuth,
            title: 'Just do it !!',
        });
      })
    })


    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'Just do it !!',
        isAuth: isAuth,
      });
    })
})

router.post('/', function (req, res, next) {
  const title = req.body.title;
  const detail = req.body.detail;
  const category = req.body.category;
  const userId = req.session.userid;

  console.log('Title:', title);
  console.log('Detail:', detail);
  console.log('Category:', category);
  console.log('User ID:', userId);

  knex("tasks")
  .insert({user_id: userId, title: title, detail: detail, category: category})
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
router.use('/delete', require('./delete'));
router.use('/tab', require('./tab'));

module.exports = router;

