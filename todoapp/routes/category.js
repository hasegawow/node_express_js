const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const knex = require('../db/knex');

router.post('/', function(req, res, next){
    const category = req.body.category;

    knex("tasks")
    .where({
        category: category
    })
    .select('category')
    .then(function(results) {
        
    })
});