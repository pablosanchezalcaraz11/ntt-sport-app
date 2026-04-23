import { Router } from 'express';
import { getPlayers, createPlayer, deletePlayer, addTrophy } from '../controller/playerController';

const router = Router();

router.get('/players', getPlayers);
router.post('/players', createPlayer);
router.delete('/players/:id', deletePlayer);
router.post('/players/:id/trophies', addTrophy);

export default router;