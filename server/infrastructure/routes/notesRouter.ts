// librerias
import express, { Request, Response } from "express"

// Middlewares
import { getLimiter, postLimiter } from "../middlewares/rateLimit"
import { auth } from "../middlewares/auth"

// Validators
import { NotesValidator } from "../validators/notesValidator"

// Dependencias
import { notesInterceptor } from "../dependencies"

// Constants
const notesValidator = new NotesValidator()
const router = express.Router()

router.post('/',
    auth,
    express.json(),
    postLimiter,
    notesValidator.createNoteValidator(),
    async (req: Request, res: Response) => {
        const loadNotesInterceptor = await notesInterceptor()
        loadNotesInterceptor.createNoteToUserInterceptor(req, res)
    }

)

router.get('/',
    auth,
    getLimiter,
    async (req: Request, res: Response) => {
        const loadNotesInterceptor = await notesInterceptor()
        loadNotesInterceptor.getAllNotesFromUserInterceptor(req, res)
    }

)

export default router