import axios from 'axios';

// Definimos la interfaz para que TypeScript nos ayude
export interface Player {
  id: string;
  nickname: string;
  level: number;
  trophies: any[];
}

export const getPlayers = async (): Promise<Player[]> => {
  const response = await axios.get('/api/players');
  return response.data;
};