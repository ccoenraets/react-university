import * as rest from './rest';

let url = "/enrollments";

export let findByStudent = (studentId, queryParams) => rest.get("/students/" + studentId + url, queryParams);

export let findByCourse = (courseId, queryParams) => rest.get("/courses/" + courseId + url, queryParams);

export let createItem = enrollment => rest.post(url, enrollment);

export let deleteItem = id => rest.del(url + "/" + id);