import { Router } from "express";
import { 
  getPlayers, // <--- Asegúrate de importar la función que saca a todos
  createPlayer, 
  getPlayerById, 
  addTrophy 
} from "../controller/playerController";

const router = Router();

// ESTA ES LA QUE FALTA:
router.get("/players", getPlayers);
// Quita el '/api' de aquí, porque ya lo pusiste en el index.ts
router.post('/players', createPlayer);
router.get("/players/:playerId", getPlayerById);
router.post("/:playerId/trophy/:game", addTrophy);

export default router;