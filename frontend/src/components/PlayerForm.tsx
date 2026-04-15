import React, { useState } from 'react';

// Definimos qué necesita este componente para funcionar
interface PlayerFormProps {
  onPlayerCreated: () => void;
}

export default function PlayerForm({ onPlayerCreated }: PlayerFormProps) {
  // Tipamos los estados
  const [nickname, setNickname] = useState<string>('');
  const [level, setLevel] = useState<number>(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("1. Iniciando envío...");

    const newPlayer = { 
        nickname: nickname, 
        level: Number(level) // Nos aseguramos de que sea un número
    };

    console.log("2. Datos a enviar:", newPlayer);

    try {
        const response = await fetch('http://localhost:3000/api/players', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newPlayer),
        });

        console.log("3. Respuesta recibida. Status:", response.status);

        if (response.ok) {
            console.log("4. ¡Todo OK!");
            setNickname('');
            setLevel(1);
            onPlayerCreated();
            alert("¡Jugador creado!");
        } else {
            const errorText = await response.text();
            console.error("4. Error del servidor:", errorText);
            alert("El servidor respondió con error: " + response.status);
        }
    } catch (error) {
        console.error("X. ERROR CRÍTICO DE CONEXIÓN:", error);
        alert("No se pudo conectar con el servidor. Revisa la consola (F12)");
    }
};

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #444', borderRadius: '8px', marginBottom: '20px' }}>
      <div style={{ marginBottom: '10px' }}>
        <label>Nickname: </label>
        <input 
          type="text" 
          value={nickname} 
          onChange={(e) => setNickname(e.target.value)} 
          required 
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Nivel: </label>
        <input 
          type="number" 
          value={level} 
          onChange={(e) => setLevel(Number(e.target.value))} 
          required 
        />
      </div>
      <button type="submit">Añadir Jugador</button>
    </form>
  );
}