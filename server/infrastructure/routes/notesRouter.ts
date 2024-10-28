// librerias
import express, { Request, Response } from "express"

// Middlewares
import { deleteLimiter, getLimiter, postLimiter, putLimiter } from "../middlewares/rateLimit"
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

router.get('/search',
    auth,
    getLimiter,
    notesValidator.queryTitleContentSearcherValidator(),
    async (req: Request, res: Response) => {
        const loadNotesInterceptor = await notesInterceptor()
        loadNotesInterceptor.searchNotesInterceptor(req, res)
    }
)

router.get('/:id',
    auth,
    getLimiter,
    notesValidator.validateIdFromParam(),
    async (req: Request, res: Response) => {
        const loadNotesInterceptor = await notesInterceptor()
        loadNotesInterceptor.getOneNoteFromUserInterceptor(req, res)
    }

)

router.put('/:id',
    auth,
    express.json(),
    putLimiter,
    notesValidator.validateIdFromParam(),
    notesValidator.validateCorrectFieldsToUpdate(),
    async (req: Request, res: Response) => {
        const loadNotesInterceptor = await notesInterceptor()
        loadNotesInterceptor.updateNoteInterceptor(req, res)
    }

)

router.delete('/:id',
    auth,
    deleteLimiter,
    notesValidator.validateIdFromParam(),
    async (req: Request, res: Response) => {
        const loadNotesInterceptor = await notesInterceptor()
        loadNotesInterceptor.deleteNoteInterceptor(req, res)
    }

)

router.get('/:id/history',
    auth,
    getLimiter,
    notesValidator.validateIdFromParam(),
    async (req: Request, res: Response) => {
        const loadNotesInterceptor = await notesInterceptor()
        loadNotesInterceptor.getNoteHistoryInterceptor(req, res)
    }

)

export default router