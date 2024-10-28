import { Request, Response } from "express"
import { validationResult } from "express-validator"

import { NotesController } from "../../application/controller/notesController"
import { ObjectId } from "mongodb";
import { NoteHistory, RequestWithUser, StatusResponses } from "../../shared/types";

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

    async getOneNoteFromUserInterceptor(req : Request, res : Response) : Promise<void> {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return
        }

        const query = await this.notesController.getOneNoteFromUser((req as RequestWithUser).userId, ObjectId.createFromHexString(req.params.id))
        res.status(query.status).json(query)
        return
    
    }

    async updateNoteInterceptor(req : Request, res : Response) : Promise<void> {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return
        }

        let query: StatusResponses | undefined
        const noteId = ObjectId.createFromHexString(req.params.id)
        
        for (let key of Object.keys(req.body)) {

            query = await this.notesController.updateNote((req as RequestWithUser).userId, noteId, key as Partial<NoteHistory>, req.body[key])
            if(query.status !== 200) break
        }
        
        if (query?.status === 200) { 
            let note = {
                title: '',
                content: ''
            }
            for (let key of Object.keys(req.body)) {
                note.title = key === 'title' ? req.body[key] : note.title
                note.content = key === 'content' ? req.body[key] : note.content
            }
            await this.notesController.addNoteToUserHistory((req as RequestWithUser).userId, noteId, note)
        }

        res.status(query?.status || 400).json(query)
        return
    
    }

    async deleteNoteInterceptor(req : Request, res : Response) : Promise<void> {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return
        }

        const query = await this.notesController.deleteNote((req as RequestWithUser).userId, ObjectId.createFromHexString(req.params.id))
        res.status(query.status).json(query)
        return
    
    }

    async getNoteHistoryInterceptor(req : Request, res : Response) : Promise<void> {

        const query = await this.notesController.getNoteHistory((req as RequestWithUser).userId, ObjectId.createFromHexString(req.params.id))
        res.status(query.status).json(query)
        return
    
    }

    async searchNotesInterceptor(req : Request, res : Response) : Promise<void> {
        
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return
        }
        const values = Object.values(req.query).map((val) => (val as string).trim())
        const userId = (req as RequestWithUser).userId

        const query = await this.notesController.searchNotes(userId, values)
        res.status(query.status).json(query)
        return 
    
    }

}