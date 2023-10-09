import axios from './axios.js';

export const getCondsRequest = () => axios.get('/Conductores')

export const getCondRequest = (id) => axios.get(`/Conductor/${id}`)

export const createCondRequest = (cond) => axios.post('/Conductores', cond)

export const updateCondRequest = (id, cond) => axios.put(`/Conductor/${id}`, cond)

export const deleteCondRequest = (id) => axios.delete(`/Conductor/${id}`)
