"use strict";

let db = require('./pghelper');

let findAll = (req, res, next) => {
    let name = req.query.name;
    let sql = `SELECT id, first_name, last_name, address, city, zip, state, first_name || ' ' || last_name as name
        FROM teacher ORDER BY first_name, last_name`;
    db.query(sql)
        .then(result => res.json(result))
        .catch(next);
};

let findById = (req, res, next) => {
    let id = req.params.id;
    let sql = `SELECT id, first_name, last_name, address, city, state, zip, title, phone, mobile_phone, email, pic
        FROM teacher WHERE id=$1`;
    db.query(sql, [parseInt(id)])
        .then(teachers =>  res.json(teachers[0]))
        .catch(next);
};


let createItem = (req, res, next) => {
    let teacher = req.body;
    let sql = `
        INSERT INTO teacher
            (first_name, last_name, address, city, state, zip, title, phone, mobile_phone, email, pic)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
        RETURNING id`;
    db.query(sql, [teacher.first_name, teacher.last_name, teacher.address, teacher.city, teacher.state, teacher.zip,
        teacher.title, teacher.phone, teacher.mobile_phone, teacher.email, teacher.pic])
        .then(result => {
            res.json(result[0])
        })
        .catch(next);
};

let updateItem = (req, res, next) => {
    let teacher = req.body;
    let sql = `UPDATE teacher SET first_name=$1, last_name=$2, address=$3, city=$4, state=$5, zip=$6, title=$7, phone=$8,
                mobile_phone=$9, email=$10, pic=$11 WHERE id=$12`;
    db.query(sql, [teacher.first_name, teacher.last_name, teacher.address, teacher.city, teacher.state, teacher.zip,
        teacher.title, teacher.phone, teacher.mobile_phone, teacher.email, teacher.pic, teacher.id])
        .then(() => res.send({result: 'ok'}))
        .catch(next);
};

let deleteItem = (req, res, next) => {
    let teacherId = req.params.id;
    db.query('DELETE FROM teacher WHERE id=$1', [teacherId], true)
        .then(() =>res.send({result: 'ok'}))
        .catch(next);
};


exports.findAll = findAll;
exports.findById = findById;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;