import { readPlayers, writePlayers, Player } from "../data/playerRepository.js";
import { randomUUID } from "node:crypto";

/**
 * Crea un nuevo jugador con ID único y lista de trofeos vacía.
 */
export const createPlayerService = async (nickname: string, level: number): Promise<Player> => {
    const players = await readPlayers();

    const newPlayer: Player = {
        id: randomUUID(),
        nickname,
        level,
        trophies: [] // Siempre empieza sin trofeos
    };

    players.push(newPlayer);
    await writePlayers(players);
    return newPlayer;
};

/**
 * Añade un trofeo a un jugador validando el juego.
 */
export const addTrophyToPlayerService = async (playerId: string, game: string, tournament: string): Promise<Player | null> => {
    const players = await readPlayers();
    const player = players.find(p => p.id === playerId);

    if (player) {
        let trophy_image = "";

        // 1. Validación de juegos permitidos según el PDF
        if (game === "League of Legends") {
            trophy_image = "https://ddragon.leagueoflegends.com/cdn/13.18.1/img/profileicon/588.png";
        } else if (game === "Valorant") {
            trophy_image = "https://media.valorant-api.com/playercards/3f61c772-4560-55a7-559d-64ba96044c30/smallart.png";
        } else {
            // Error específico solicitado en el PDF
            throw new Error("Juego no soportado en el torneo");
        }

        // 2. Si el juego es válido, añadimos el objeto trofeo
        player.trophies.push({
            game,
            tournament,
            trophy_image
        });

        await writePlayers(players);
        return player;
    }

    return null;
};

/**
 * Obtiene el perfil completo de un jugador por su ID.
 */
export const getPlayerByIdService = async (id: string): Promise<Player | null> => {
    const players = await readPlayers();
    return players.find(p => p.id === id) || null;
};