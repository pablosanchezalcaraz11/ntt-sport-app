import { Router } from "express";
import { addTrophy, createPlayer, getPlayerById } from "../controller/playerController";


const router = Router();

// 1. POST /api/players : Para crear al jugador
router.post("/", createPlayer);

// 2. POST /api/players/:playerId/trophy/:game : Para añadir un trofeo
router.post("/:playerId/trophy/:game", addTrophy);

// 3. GET /api/players/:playerId : Para ver el perfil completo
router.get("/:playerId", getPlayerById);

export default router;