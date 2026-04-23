import { Request, Response } from 'express';
import * as playerservice from '../service/playerService';

export const getPlayers = async (_req: Request, res: Response) => {
    try {
        const players = await playerservice.getPlayersService();
        res.json(players);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createPlayer = async (req: Request, res: Response) => {
    try {
        const { nickname, level, trophies } = req.body;
        const nuevo = await playerservice.createPlayerService(nickname, level, trophies);
        res.status(201).json(nuevo);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePlayer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        await playerservice.deletePlayerService(id);
        res.status(200).json({ message: "Eliminado" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const addTrophy = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // Viene de la URL
        const { game, tournament } = req.body; // Viene del JSON del front
        
        const playerId = Array.isArray(id) ? id[0] : id; // Asegurarse de que sea un string
        const actualizado = await playerservice.addTrophyService(playerId, { game, tournament });
        
        res.status(200).json(actualizado);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};