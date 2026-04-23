import { useEffect, useState } from 'react'
import { getPlayers } from './services/api'
import PlayerForm from './components/PlayerForm'

function App() {
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPlayers = async () => {
    setLoading(true);
    try { setPlayers(await getPlayers()); } catch (e) { console.error("Off"); } finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar?")) return;
    await fetch(`http://localhost:3000/api/players/${id}`, { method: 'DELETE' });
    setPlayers(players.filter(p => p.id !== id));
  };

  useEffect(() => { loadPlayers(); }, []);

  return (
    <div style={appStyle}>
      <header style={header}>
        <h1 style={logo}>NTT <span style={{color: '#fff'}}>PRO</span></h1>
        <div style={status}>LIVE DATABASE</div>
      </header>
      
      <div style={content}>
        <aside style={sidebar}>
            <div style={panel}>
                <h4 style={h}>CONFIGURACIÓN</h4>
                <input id="tournament" placeholder="Torneo" style={inp} />
                <input id="game" placeholder="Juego" style={inp} />
            </div>
            <PlayerForm onPlayerCreated={loadPlayers} />
        </aside>

        <main style={list}>
          {loading ? <div className="spinner"></div> : (
            players.map(p => (
              <div key={p.id} style={card}>
                <div style={pInfo}>
                  <div style={lvl}>{p.level}</div>
                  <span style={nick}>{p.nickname}</span>
                </div>
                <div style={trBox}>
                  {p.trophies?.map((t: any, i: number) => (
                    <div key={i} style={chip}>🏆 {t.game}</div>
                  ))}
                </div>
                <button onClick={() => handleDelete(p.id)} style={del}>🗑️</button>
              </div>
            ))
          )}
        </main>
      </div>
      <style>{`.spinner{border:3px solid #222;border-left-color:#00d4ff;width:30px;height:30px;border-radius:50%;animation:s 1s linear infinite;margin:20px auto}@keyframes s{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

const appStyle = { backgroundColor: '#050505', color: '#fff', minHeight: '100vh', padding: '0 40px', fontFamily: 'Inter, sans-serif' };
const header = { display: 'flex', justifyContent: 'space-between', padding: '30px 0', borderBottom: '1px solid #1a1a1a' };
const logo = { color: '#00d4ff', fontSize: '1.5rem', fontWeight: 900 };
const status = { fontSize: '0.6rem', color: '#00ff88', border: '1px solid #00ff88', padding: '4px 10px', borderRadius: '20px' };
const content = { display: 'flex', gap: '40px', marginTop: '40px' };
const sidebar = { width: '300px', display: 'flex', flexDirection: 'column' as 'column', gap: '20px' };
const list = { flex: 1 };
const panel = { background: '#111', padding: '20px', borderRadius: '12px', border: '1px solid #222' };
const h = { fontSize: '0.6rem', color: '#444', marginBottom: '10px' };
const inp = { width: '100%', padding: '10px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px', marginBottom: '10px', boxSizing: 'border-box' as 'border-box' };
const card = { background: '#111', padding: '15px 20px', borderRadius: '12px', marginBottom: '10px', display: 'flex', alignItems: 'center', border: '1px solid #222' };
const pInfo = { display: 'flex', alignItems: 'center', minWidth: '180px' };
const lvl = { background: '#00d4ff', color: '#000', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' as 'bold', marginRight: '15px' };
const nick = { fontWeight: 'bold' };
const trBox = { display: 'flex', gap: '8px', flex: 1 };
const chip = { background: '#1a1a1a', padding: '4px 10px', borderRadius: '15px', fontSize: '0.7rem', border: '1px solid #333' };
const del = { background: 'none', border: 'none', cursor: 'pointer', opacity: 0.3 };

export default App;