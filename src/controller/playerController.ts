import { Request, Response } from "express";
import { addTrophyToPlayerService, createPlayerService,  getPlayerByIdService } from "../service/playerService";

const createPlayer = async (req: Request, res: Response) => {
    try {
        // Desestructuramos del body según pide el ejercicio
        const { nickname, level }: { nickname: string, level: number } = req.body;

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
       // Cambia la línea 37 por esta:
const { playerId } = req.params as any;
        const player = await getPlayerByIdService(playerId);

        if (player) {
            res.json(player);
        } else {
            res.status(404).json({ message: "Jugador no encontrado" });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export {
    createPlayer,
    addTrophy,
    getPlayerById
};
