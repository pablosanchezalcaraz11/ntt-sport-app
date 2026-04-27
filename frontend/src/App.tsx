import { useEffect, useState } from 'react'
import { getPlayers } from './services/api'
import PlayerForm from './components/PlayerForm'
import './App.css'

function App() {
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [searchQuery, setSearchQuery] = useState('');

  const loadPlayers = async () => {
    setLoading(true);
    try {
      setPlayers(await getPlayers());
    } catch (e) {
      console.error('Off', e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setConfirmDeleteId(id);
  };

  const executeDelete = async () => {
    if (!confirmDeleteId) return;
    setDeletingId(confirmDeleteId);
    try {
      await fetch(`http://localhost:3000/api/players/${confirmDeleteId}`, { method: 'DELETE' });
      setPlayers(players.filter(p => p.id !== confirmDeleteId));
      setConfirmDeleteId(null);
    } catch (e) {
      console.error('Error deleting player', e);
    } finally {
      setDeletingId(null);
    }
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const lowerSearch = searchQuery.trim().toLowerCase();
  const filteredPlayers = players.filter(player => {
    const nickname = player.nickname.toLowerCase();
    const games = (player.trophies?.map((t: any) => t.game).join(' ') || '').toLowerCase();
    const tournaments = (player.trophies?.map((t: any) => t.tournament).join(' ') || '').toLowerCase();
    return (
      nickname.includes(lowerSearch) ||
      games.includes(lowerSearch) ||
      tournaments.includes(lowerSearch)
    );
  });

  const visiblePlayers = filteredPlayers;
  const totalPlayers = visiblePlayers.length;
  const totalTrophies = visiblePlayers.reduce((sum, player) => sum + (player.trophies?.length || 0), 0);
  const averageLevel = totalPlayers ? (visiblePlayers.reduce((sum, player) => sum + player.level, 0) / totalPlayers).toFixed(1) : '0.0';

  const levelBuckets = [
    { label: '1-25', count: visiblePlayers.filter(p => p.level >= 1 && p.level <= 25).length },
    { label: '26-50', count: visiblePlayers.filter(p => p.level >= 26 && p.level <= 50).length },
    { label: '51-75', count: visiblePlayers.filter(p => p.level >= 51 && p.level <= 75).length },
    { label: '76-100', count: visiblePlayers.filter(p => p.level >= 76 && p.level <= 100).length },
    { label: '100+', count: visiblePlayers.filter(p => p.level > 100).length },
  ];
  const maxBucketCount = Math.max(...levelBuckets.map(b => b.count), 1);

  useEffect(() => { loadPlayers(); }, []);

  return (
    <div className={`app theme-${theme}`}>
      <header className="app__header">
        <div>
          <h1 className="app__logo">NTT <span>PRO</span></h1>
          <p className="app__subtitle">Administra el ranking de jugadores</p>
        </div>
        <div className="app__header-actions">
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="app__search-input"
            placeholder="Buscar jugador, juego o torneo"
            aria-label="Buscar jugadores"
          />
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          </button>
          <div className="app__status">LIVE DATABASE</div>
        </div>
      </header>

      <div className="app__content">
        <aside className="sidebar">
          <div className="sidebar__panel">
            <h4 className="sidebar__panel-title">CONFIGURACIÓN</h4>
            <input id="tournament" placeholder="Torneo" className="sidebar__input" />
            <input id="game" placeholder="Juego" className="sidebar__input" />
          </div>
          <PlayerForm onPlayerCreated={loadPlayers} />
        </aside>

        <main className="player-list">
          <div className="stats-grid">
            <div className="stats-card">
              <span className="stats-card__label">Jugadores</span>
              <strong className="stats-card__value">{totalPlayers}</strong>
            </div>
            <div className="stats-card">
              <span className="stats-card__label">Nivel promedio</span>
              <strong className="stats-card__value">{averageLevel}</strong>
            </div>
            <div className="stats-card">
              <span className="stats-card__label">Trofeos</span>
              <strong className="stats-card__value">{totalTrophies}</strong>
            </div>
          </div>

          <section className="chart-panel">
            <div className="chart-panel__header">
              <span>Distribución de niveles</span>
              <strong>{totalPlayers} jugadores</strong>
            </div>
            <div className="level-chart">
              {levelBuckets.map(bucket => (
                <div key={bucket.label} className="level-chart__row">
                  <span className="level-chart__label">{bucket.label}</span>
                  <div className="level-chart__bar-wrapper">
                    <div
                      className="level-chart__bar"
                      style={{ width: `${(bucket.count / maxBucketCount) * 100}%` }}
                    />
                  </div>
                  <span className="level-chart__count">{bucket.count}</span>
                </div>
              ))}
            </div>
          </section>

          {loading ? (
            <div className="player-list__spinner" />
          ) : visiblePlayers.length === 0 ? (
            <div className="player-list__empty">No hay jugadores coincidentes.</div>
          ) : (
            visiblePlayers.map(p => (
              <div key={p.id} className="player-card">
                <div className="player-card__info">
                  <div className="player-card__level">{p.level}</div>
                  <span className="player-card__nickname">{p.nickname}</span>
                </div>
                <div className="player-card__trophy-list">
                  {p.trophies?.map((t: any, i: number) => (
                    <div key={i} className="player-card__chip">🏆 {t.game}</div>
                  ))}
                </div>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="player-card__delete"
                  disabled={deletingId === p.id || loading}
                >
                  {deletingId === p.id ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            ))
          )}
        </main>
      </div>

      {confirmDeleteId && (
        <div className="confirm-modal__overlay" onClick={cancelDelete}>
          <div className="confirm-modal" onClick={e => e.stopPropagation()}>
            <p className="confirm-modal__eyebrow">Confirmación</p>
            <h2 className="confirm-modal__title">¿Eliminar jugador?</h2>
            <p className="confirm-modal__text">
              Esta acción no se puede deshacer. ¿Estás seguro de que quieres eliminar a <strong>{players.find(p => p.id === confirmDeleteId)?.nickname || 'este jugador'}</strong>?
            </p>

            <div className="confirm-modal__actions">
              <button type="button" className="confirm-modal__button confirm-modal__button--cancel" onClick={cancelDelete} disabled={!!deletingId}>
                Cancelar
              </button>
              <button type="button" className="confirm-modal__button confirm-modal__button--confirm" onClick={executeDelete} disabled={!!deletingId}>
                {deletingId === confirmDeleteId ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
