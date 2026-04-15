import { Request, Response } from "express";
import { addTrophyToPlayerService, createPlayerService, getPlayerByIdService, getPlayersService } from "../service/playerService";
const getPlayers = async (req: Request, res: Response) => {
  try {
    // Llamamos al servicio para que traiga los datos del JSON
    const players = await getPlayersService(); 
    res.json(players);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const createPlayer = async (req: Request, res: Response) => {
    try {
        // Desestructuramos del body según pide el ejercicio
       const { nickname, level } = req.body;
console.log("Cuerpo recibido:", req.body);

        const nuevoPlayer = await createPlayerService(nickname, level);
        res.status(201).json(nuevoPlayer);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const addTrophy = async (req: Request, res: Response) => {
    try {
        // Sacamos IDs y parámetros de la URL
        const { playerId, game } = req.params as any;
        const { tournament } = req.body;

        const player = await addTrophyToPlayerService(playerId, game, tournament);

        if (player) {
            res.status(200).json(player);
        } else {
            res.status(404).json({ message: "Jugador no encontrado" });
        }
    } catch (error: any) {
        // Capturamos el error de "Juego no soportado" y devolvemos 400
        res.status(400).json({ message: error.message });
    }
};

const getPlayerById = async (req: Request, res: Response) => {
  try {
    const { playerId } = req.params;
    const player = await getPlayerByIdService(playerId as any);
    
    if (!player) {
      return res.status(404).json({ message: "Jugador no encontrado" });
    }
    
    res.json(player);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export {
    createPlayer,
    addTrophy,
    getPlayerById,
    getPlayers
};
