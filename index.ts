import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
// Añadimos /src/ porque el archivo index.ts está fuera
import playerRoutes from './src/routes/playerRoutes'; 

const app = express();
app.use(express.json());

app.use('/api/players', playerRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
    console.log(`E-Sports API running on port ${PORT}`);
});

