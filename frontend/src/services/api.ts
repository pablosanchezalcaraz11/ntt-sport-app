import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api' // Sin el /players final aquí
});

export const getPlayers = async () => {
  const response = await api.get('/players'); // Aquí se completa la ruta: /api/players
  return response.data;
};