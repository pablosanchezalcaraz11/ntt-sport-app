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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "players.json");

// 3. Función para leer (Asíncrona con promesas)
async function readPlayers(): Promise<Player[]> {
  try {
    const raw = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(raw) as Player[];
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err.code === "ENOENT") {
      return []; // Si no existe el archivo, devolvemos array vacío
    }
    throw error;
  }
}

// 4. Función para escribir
async function writePlayers(players: Player[]): Promise<void> {
  await fs.writeFile(dataPath, JSON.stringify(players, null, 2), "utf-8");
}

export { readPlayers, writePlayers };
export type { Player, Trophy };