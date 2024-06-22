const express = require('express');
const router = express.Router();

let todos = [];
let tests = [];

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'ToDo App',
    todos: todos,
    tests: tests,
  });
});

router.post('/', function (req, res, next) {
  const todo = req.body.todo;
  todos.push(todo);
  res.redirect('/');
});

router.post('/test', function (req, res, next) {
  const test = req.body.test;
  tests.push(test);
  res.redirect('/');
});



module.exports = router;