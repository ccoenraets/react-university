"use strict";

let db = require('./pghelper');

let findAll = (req, res, next) => {
    let periodId = req.query.periodId;
    let sql = `
        SELECT c.id, c.code, c.name, teacher_id, t.first_name || ' ' || t.last_name as teacher_name,
            c.period_id, p.name as period_name, credits,
            count(e.student_id) as student_count
        FROM course as c
        INNER JOIN teacher as t ON c.teacher_id=t.id
        INNER JOIN period as p ON c.period_id=p.id
        LEFT OUTER JOIN enrollment as e ON c.id=e.course_id
        ${periodId ? 'WHERE c.period_id = $1' : ''}
        GROUP BY c.id, t.first_name, t.last_name, p.name
        ORDER BY period_id DESC, code`;
    db.query(sql, periodId ? [periodId] : [])
        .then(result => res.json(result))
        .catch(next);
};

let findByTeacher = (req, res, next) => {
    let teacherId = req.params.id;
    let sql = `
        SELECT c.id, c.code, c.name, teacher_id, t.first_name || ' ' || t.last_name as teacher_name,
            c.period_id, p.name as period_name, credits,
            count(e.student_id) as student_count
        FROM course as c
        INNER JOIN teacher as t ON c.teacher_id=t.id
        INNER JOIN period as p ON c.period_id=p.id
        LEFT OUTER JOIN enrollment as e ON c.id=e.course_id
        WHERE teacher_id = $1
        GROUP BY c.id, t.first_name, t.last_name, p.name
        ORDER BY period_id DESC, code`;
    db.query(sql, [parseInt(teacherId)])
        .then(courses =>  res.json(courses))
        .catch(next);
};

let findById = (req, res, next) => {
    let id = req.params.id;
    let sql = `
        SELECT c.id, c.code, c.name, teacher_id, t.first_name || ' ' || t.last_name as teacher_name,
            c.period_id, p.name as period_name, credits
        FROM course as c
        INNER JOIN teacher as t ON c.teacher_id=t.id
        INNER JOIN period as p ON c.period_id=p.id
        WHERE c.id = $1`;
    db.query(sql, [parseInt(id)])
        .then(courses =>  res.json(courses[0]))
        .catch(next);
};

let createItem = (req, res, next) => {
    let course = req.body;
    let sql = `INSERT INTO course (code, name, period_id, teacher_id, credits)
			   VALUES ($1, $2, $3, $4, $5)`;
    db.query(sql, [course.code, course.name, course.period_id, course.teacher_id, course.credits])
        .then(result => res.send({id: result.insertId}))
        .catch(next);
};

let updateItem = (req, res, next) => {
    let course = req.body;
    let sql = `UPDATE course SET code=$1, name=$2, period_id=$3, teacher_id=$4, credits=$5 WHERE id=$6`;
    db.query(sql, [course.code, course.name, course.period_id, course.teacher_id, course.credits, course.id])
        .then(() => res.send({result: 'ok'}))
        .catch(next);
};

let deleteItem = (req, res, next) => {
    let courseId = req.params.id;
    db.query('DELETE FROM course WHERE id=$1', [courseId], true)
        .then(() => res.send({result: 'ok'}))
        .catch(next);
};

exports.findAll = findAll;
exports.findByTeacher = findByTeacher;
exports.findById = findById;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;