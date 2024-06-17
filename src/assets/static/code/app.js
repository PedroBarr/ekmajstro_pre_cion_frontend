import { writable, derived, get } from 'svelte/store';

const localHosts = [
  "localhost",
  "127."
];

let enviroment = 'prod';

if (localHosts.find(item => window.location.hostname.includes(item)))
  enviroment = 'dev';

export const api = enviroment === 'prod' ?
  'https://ekcion-api.up.railway.app/api' : 'http://localhost:8000/api';
export const assets = enviroment === 'prod' ?
  'https://ekcion-api.up.railway.app/assets' : 'http://localhost:8000/assets';
export const base = enviroment === 'prod' ?
  'ekmajstro_pre_cion_frontend' : '';