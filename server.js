var express = require('express'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    students = require('./server/students'),
    courses = require('./server/courses'),
    enrollments = require('./server/enrollments'),
    teachers = require('./server/teachers'),
    periods = require('./server/periods'),
    sqlinit = require('./server/sqlinit'),
    app = express();

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(compression());

app.use('/', express.static(__dirname + '/www'));

app.get('/students', students.findAll);
app.get('/students/:id', students.findById);
app.get('/students/:id/enrollments', enrollments.findByStudent);
app.post('/students', students.createItem);
app.put('/students', students.updateItem);
app.delete('/students/:id', students.deleteItem);

app.get('/courses', courses.findAll);
app.get('/courses/:id', courses.findById);
app.get('/courses/:id/enrollments', enrollments.findByCourse);
app.post('/courses', courses.createItem);
app.put('/courses', courses.updateItem);
app.delete('/courses/:id', courses.deleteItem);

app.get('/teachers', teachers.findAll);
app.get('/teachers/:id', teachers.findById);
app.get('/teachers/:id/courses', courses.findByTeacher);
app.post('/teachers', teachers.createItem);
app.put('/teachers', teachers.updateItem);
app.delete('/teachers/:id', teachers.deleteItem);

app.post('/enrollments', enrollments.createItem);
app.delete('/enrollments/:id', enrollments.deleteItem);

app.get('/periods', periods.findAll);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err);
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});