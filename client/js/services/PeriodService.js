import * as rest from './rest';

let url = "/periods";

export let findAll = () => rest.get(url);