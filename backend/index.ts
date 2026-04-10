import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from 'cors'; // 1. Importación
import playerRoutes from './src/routes/playerRoutes';

const app = express();

// 2. Middlewares (Siempre antes de las rutas)
app.use(cors()); 
app.use(express.json());

// 3. Rutas
app.use('/api', playerRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
    console.log(`E-Sports API running on port ${PORT}`);
});
