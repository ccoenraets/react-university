"use strict";

let fs = require('fs'),
    path = require('path'),
    db = require('./pghelper');

let filePath = path.join(__dirname, '../init.sql');

fs.readFile(filePath, {encoding: 'utf-8'}, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        db.query(data)
            .then(function() {
                console.log('Postgres tables successfully initialized') ;
            })
            .catch(function(error) {
                console.log('Error initializing Postgres tables initialized');
                console.log(error)
            })
    }

});