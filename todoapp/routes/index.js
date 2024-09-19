const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const knex = require('../db/knex');


router.get('/', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  console.log(userId);


  knex("tasks")
    .where("user_id", userId)
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

  if (!userId) {
    console.error("User ID is missing from session.");
    return res.status(400).send("User ID is missing.");
  }

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
router.use('/category', require('./category'));
router.use('/cate_dele', require('./cate_dele'));
router.use('/edit', require('./edit'));

module.exports = router;

