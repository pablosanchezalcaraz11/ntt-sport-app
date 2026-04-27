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
    <form onSubmit={handleSubmit} className="player-form">
      <h4 className="player-form__title">NUEVO JUGADOR</h4>
      <input
        placeholder="Nickname"
        value={nickname}
        onChange={e => setNickname(e.target.value)}
        required
        className="player-form__input"
        disabled={saving}
      />
      <input
        type="number"
        value={level}
        onChange={e => setLevel(Number(e.target.value))}
        required
        className="player-form__input"
        disabled={saving}
      />
      <button type="submit" className="player-form__button" disabled={saving}>
        {saving ? 'Añadiendo...' : 'AÑADIR'}
      </button>
    </form>
  );
}
