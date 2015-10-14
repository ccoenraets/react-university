"use strict";

let db = require('./pghelper');

let findAll  = (req, res, next) => {
    let name = req.query.name;
    let sql = "SELECT id, name FROM period ORDER BY id DESC";
    db.query(sql)
        .then(result => res.json(result))
        .catch(next);
};

exports.findAll = findAll;