import { useEffect, useState } from 'react'
import { getPlayers } from './services/api'
// Importamos el nuevo componente (asegúrate de haber creado la carpeta y el archivo)
import PlayerForm from './components/PlayerForm' 

interface Player {
  id: string;
  nickname: string;
  level: number;
}

function App() {
  const [players, setPlayers] = useState<Player[]>([]);

  // 1. Hemos sacado la función fuera del useEffect para poder pasársela al Formulario
  const loadPlayers = async () => {
    try {
      const data = await getPlayers();
      setPlayers(data);
    } catch (error) {
      console.error("Error cargando jugadores:", error);
    }
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>NTT Sport - Dashboard</h1>
      <hr />

      {/* 2. Añadimos el formulario y le pasamos la función de carga */}
      <PlayerForm onPlayerCreated={loadPlayers} />

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