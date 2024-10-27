import express from "express"
import cors from "cors"
import userRouter from "./infrastructure/routes/userRouter"
import notesRouter from "./infrastructure/routes/notesRouter"
import { ConnectToDatabase } from "./infrastructure/database"
import cookieParser from "cookie-parser"

const startApp = async () => {

    const db = new ConnectToDatabase()
    await db.connectOpen()
    const app = express()
    app.use(cors())

    
    app.use('/', (_req, _res, next) => {
        console.log('Hello World!')
        next()
    })
    
    app.use('/users', userRouter)
    app.use('/notes', cookieParser(), notesRouter)
    
    app.use((_req, res, next) => {
        res.status(404).send('Page not found')
        next()
    })
    
    const PORT = process.env.PORT || 3000

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })

}

startApp()