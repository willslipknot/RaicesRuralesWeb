import axios from './axios.js';

export const getActsRequest = () => axios.get('/Actividades')

export const getActRequest = (id) => axios.get(`/Actividad/${id}`)

export const createActRequest = (act) => axios.post('/Actividades', act)

export const updateActRequest = (id, act) => axios.put(`/Actividad/${id}`, act)

export const deleteActRequest = (id) => axios.delete(`/Actividad/${id}`)
