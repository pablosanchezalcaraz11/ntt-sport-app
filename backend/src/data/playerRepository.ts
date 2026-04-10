import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// 1. Definimos los tipos según el PDF
type Trophy = {
  game: string;
  tournament: string;
  trophy_image: string;
};

type Player = {
  id: string; // UUID
  nickname: string;
  level: number;
  trophies: Trophy[];
};

// 2. Configuración de rutas (Mismo estilo que tu imagen)

const dataPath = path.resolve(__dirname, "../../src/data/players.json");
console.log("🔍 Buscando datos en:", dataPath);

// 3. Función para leer (Asíncrona con promesas)
// backend/src/data/playerRepository.ts

async function readPlayers(): Promise<Player[]> {
  try {
    console.log("📂 Intentando leer desde:", dataPath); // Chivato 1
    const raw = await fs.readFile(dataPath, "utf-8");
    
    console.log("📄 Contenido bruto:", raw); // Chivato 2
    return JSON.parse(raw) as Player[];
  } catch (error: any) {
    // CAMBIO CLAVE: Que nos diga el error real por consola
    console.error("❌ ERROR EN REPOSITORY:", error.message);
    return []; 
  }
}
// 4. Función para escribir
async function writePlayers(players: Player[]): Promise<void> {
  await fs.writeFile(dataPath, JSON.stringify(players, null, 2), "utf-8");
}

export { readPlayers, writePlayers };
export type { Player, Trophy };