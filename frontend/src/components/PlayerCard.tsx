import type { Player } from '../types';

type Props = {
  player: Player;
  deleting: boolean;
  onDelete: (id: string) => void;
};

export default function PlayerCard({ player, deleting, onDelete }: Props) {
  return (
    <article className="player-card">
      <div className="player-card__info">
        <span className="player-card__level">{player.level}</span>
        <span className="player-card__nickname">{player.nickname}</span>
      </div>

      <div className="player-card__trophies">
        {player.trophies?.length ? (
          player.trophies.map((trophy, index) => (
            <span key={index} className="player-card__chip">
              🏆 {trophy.game}
            </span>
          ))
        ) : (
          <span className="player-card__empty">Sin trofeos</span>
        )}
      </div>

      <button
        type="button"
        className="player-card__delete"
        onClick={() => onDelete(player.id)}
        disabled={deleting}
      >
        {deleting ? 'Eliminando...' : 'Eliminar'}
      </button>
    </article>
  );
}
