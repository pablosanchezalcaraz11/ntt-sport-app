import type { Player } from '../types';
import PlayerCard from './PlayerCard';

type Props = {
  players: Player[];
  loading: boolean;
  deletingId: string | null;
  onDelete: (id: string) => void;
};

export default function PlayerList({ players, loading, deletingId, onDelete }: Props) {
  if (loading) {
    return <div className="player-list__loading" />;
  }

  if (players.length === 0) {
    return <div className="player-list__empty">No hay jugadores registrados.</div>;
  }

  return (
    <div className="player-list">
      {players.map(player => (
        <PlayerCard
          key={player.id}
          player={player}
          onDelete={onDelete}
          deleting={deletingId === player.id}
        />
      ))}
    </div>
  );
}
