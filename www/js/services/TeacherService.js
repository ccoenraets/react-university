import * as rest from './rest';

let url = "/teachers";

export let findAll = queryParams => rest.get(url, queryParams);

export let findById = id => rest.get(url + "/" + id);

export let createItem = student => rest.post(url, student);

export let updateItem = student => rest.put(url, student);

export let deleteItem = id => rest.del(url + "/" + id);