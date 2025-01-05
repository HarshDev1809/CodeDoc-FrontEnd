'use client'
import axios from 'axios';
// const URL = `https://code-doc-api.onrender.com`;
const URL = `http://localhost:8000`;
const userDetails = JSON.parse(localStorage.getItem('userDetails'));
const token = userDetails ? userDetails.token : null;

const api = axios.create({
  baseURL: URL,
  headers: {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
});

export const fetchData = async (route, method = 'GET', payload = null) => {
  try {
    let response;
    switch (method.toUpperCase()) {
      case 'GET':
        response = await api.get(route);
        break;
      case 'POST':
        response = await api.post(route, payload);
        break;
      case 'PUT':
        response = await api.put(route, payload);
        break;
      case 'PATCH':
        response = await api.patch(route, payload);
        break;
      case 'DELETE':
        response = await api.delete(route,  payload );
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
