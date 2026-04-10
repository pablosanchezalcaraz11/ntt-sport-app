import { useEffect, useState } from 'react'
import { getPlayers } from './services/api'

interface Player {
  id: string;
  nickname: string;
  level: number;
}

function App() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    // Función para cargar los datos
    const loadPlayers = async () => {
      try {
        const data = await getPlayers();
        setPlayers(data);
      } catch (error) {
        console.error("Error cargando jugadores:", error);
      }
    };

    loadPlayers();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>NTT Sport - Dashboard</h1>
      <hr />
      <h2>Lista de Jugadores</h2>
      {players.length === 0 ? (
        <p>No hay jugadores registrados o cargando...</p>
      ) : (
        <ul>
          {players.map(player => (
            <li key={player.id}>
              <strong>{player.nickname}</strong> - Nivel {player.level}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App