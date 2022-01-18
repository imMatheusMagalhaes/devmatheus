import 'dotenv/config'
import 'reflect-metadata';
import express from 'express'
import cors from 'cors'
import userRoute from "./controllers/UserController";
import { createConnection } from "typeorm";
import postRoute from "./controllers/PostController";
import morganMiddleware from './config/morganMiddleware';
import Logger from './lib/logger';
import { WinstonAdaptor } from 'typeorm-logger-adaptor/logger/winston';
// Porta do servidor
const PORT = process.env.PORT || 4000
// Host do servidor
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'
// Conction with BD
createConnection(
    {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: process.env.BD_USER || "postgres",
        password: process.env.BD_PASS || "postgres",
        database: "devmatheus",
        synchronize: true,
        logging: false,
        logger: new WinstonAdaptor(Logger, 'all'),
        entities: [
            "src/entities/**/*.ts"
        ],
        // "migrations": [
        //     "src/migration/**/*.ts"
        // ],
        // "subscribers": [
        //     "src/subscriber/**/*.ts"
        // ],
        // "cli": {
        //     "entitiesDir": "src/entity",
        //     "migrationsDir": "src/migration",
        //     "subscribersDir": "src/subscriber"
        // }
    }
)
// App Express
const app = express()
// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Endpoint raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo!')
})
// Cors
app.use(cors({
    origin: ['http://localhost:3000']
}))
//Logger
app.use(morganMiddleware)
// Rotas
app.use('/api', userRoute, postRoute)
// Resposta padrão para quaisquer outras requisições:
app.use((req, res) => {
    res.status(404)
})
// Inicia o sevidor
app.listen(PORT, () => {
    Logger.debug(`Servidor rodando em: ${HOSTNAME}:${PORT}`)
})