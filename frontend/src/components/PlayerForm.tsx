import React, { useState } from 'react';

export default function PlayerForm({ onPlayerCreated }: { onPlayerCreated: () => void }) {
  const [nickname, setNickname] = useState('');
  const [level, setLevel] = useState(1);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const game = (document.getElementById('game') as HTMLInputElement)?.value;
    const tournament = (document.getElementById('tournament') as HTMLInputElement)?.value;

    setSaving(true);
    try {
      await fetch('http://localhost:3000/api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, level, trophies: tournament ? [{ game, tournament }] : [] })
      });
      setNickname('');
      onPlayerCreated();
    } catch (error) {
      console.error('Error creating player', error);
      alert('No se pudo añadir el jugador. Intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={fB}>
      <h4 style={hS}>NUEVO JUGADOR</h4>
      <input
        placeholder="Nickname"
        value={nickname}
        onChange={e => setNickname(e.target.value)}
        required
        style={iS}
        disabled={saving}
      />
      <input
        type="number"
        value={level}
        onChange={e => setLevel(Number(e.target.value))}
        required
        style={iS}
        disabled={saving}
      />
      <button type="submit" style={bS} disabled={saving}>
        {saving ? 'Añadiendo...' : 'AÑADIR'}
      </button>
    </form>
  );
}

const fB = { background: '#111', padding: '20px', borderRadius: '12px', border: '1px solid #222' };
const hS = { fontSize: '0.6rem', color: '#444', marginBottom: '10px' };
const iS = { width: '100%', padding: '10px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px', marginBottom: '10px', boxSizing: 'border-box' as 'border-box' };
const bS = { width: '100%', padding: '10px', background: '#00d4ff', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold' as 'bold', cursor: 'pointer' };