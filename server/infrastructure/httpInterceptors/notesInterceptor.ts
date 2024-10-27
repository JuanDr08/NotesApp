import { Request, Response } from "express"
import { validationResult } from "express-validator"

import { NotesController } from "../../application/controller/notesController"
import { ObjectId } from "mongodb";
import { RequestWithUser } from "../../shared/types";

export class NotesInterceptor {

    constructor(private readonly notesController : NotesController) {
    }

    async createNoteToUserInterceptor(req : Request, res : Response) : Promise<void> {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return
        }

        const { title, content } = req.body
        const note = {
            id: new ObjectId(),
            title,
            content,
        }
        const query = await this.notesController.createNoteUseCasae((req as RequestWithUser).userId, note)
        res.status(query.status).json(query)
        return
    
    }

    async getAllNotesFromUserInterceptor(req : Request, res : Response) : Promise<void> {

        const query = await this.notesController.getAllNotesFromUser((req as RequestWithUser).userId)
        res.status(query.status).json(query)
        return
    
    }

}