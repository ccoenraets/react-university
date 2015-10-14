import * as rest from './rest';

let url = "/students";

export let findAll = sort => rest.get(url, {sort});

export let findByName = name => rest.get(url, {name});

export let findById = id => rest.get(url + "/" + id);

export let createItem = student => rest.post(url, student);

export let updateItem = student => rest.put(url, student);

export let deleteItem = id => rest.del(url + "/" + id);