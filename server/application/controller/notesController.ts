import { NotesService } from "../../domain/services/notesService";
import { MongoId, Note, NoteHistory, NoteWithoutHistory, StatusResponses } from "../../shared/types";


export class NotesController {

    constructor (
        private readonly notesService : NotesService
    ) {}

    async createNoteUseCasae(userId: MongoId, note: NoteWithoutHistory) : Promise<StatusResponses> {

        try {
            await this.notesService.addNoteToUser(userId, note)
            const {id, ...data} = note
            await this.notesService.addNoteToUserHistory(userId, id as MongoId , data)
            return {status: 200, data: note, message: 'Nota registrada'}
        } catch (error: unknown) {

            return {status: 400, message: (error as Error).message}
        }

    }

    async getAllNotesFromUser(userId: MongoId) : Promise<StatusResponses> {

        try {
            const query = await this.notesService.getAllNotesFromUser(userId)
            return {status: 200, data: query, message: 'Notas obtenidas'}
        } catch (error: unknown) {

            return {status: 400, message: (error as Error).message}
        }
    }

    async getOneNoteFromUser(userId : MongoId, noteId : MongoId) : Promise<StatusResponses> {

        try {
            const query = await this.notesService.getOneNoteFromUser(userId, noteId)
            return {status: 200, data: query, message: 'Nota obtenida'}
        } catch (error: unknown) {

            return {status: 400, message: (error as Error).message}
        }
    }

    async updateNote(userId: MongoId, noteId: MongoId, field: Partial<NoteHistory>, value: string) : Promise<StatusResponses> {

        try {
            const query = await this.notesService.updateNote(userId, noteId, field, value)
            return {status: 200, data: query, message: 'Nota actualizada'}
        } catch (error: unknown) {

            return {status: 400, message: (error as Error).message}
        }
    }

    async addNoteToUserHistory(userId: MongoId, noteId: MongoId, note: NoteWithoutHistory) : Promise<StatusResponses> {

        try {
            const query = await this.notesService.addNoteToUserHistory(userId, noteId, note)
            return {status: 200, data: query, message: 'Nota añadida'}
        } catch (error: unknown) {

            return {status: 400, message: (error as Error).message}
        }
    }

    async deleteNote(userId: MongoId, noteId: MongoId) : Promise<StatusResponses> {

        try {
            const query = await this.notesService.deleteNote(userId, noteId)
            return {status: 200, data: query, message: 'Nota eliminada'}
        } catch (error: unknown) {

            return {status: 400, message: (error as Error).message}
        }
    }

    async getNoteHistory(userId: MongoId, noteId: MongoId) : Promise<StatusResponses> {

        try {
            const query = await this.notesService.getNoteHistory(userId, noteId)
            return {status: 200, data: query, message: 'Historial de nota'}
        } catch (error: unknown) {

            return {status: 400, message: (error as Error).message}
        }
    }

    async searchNotes(userId: MongoId, values: string[]) : Promise<StatusResponses> {

        try {
            let {notes} = await this.notesService.getAllNotesFromUser(userId)
            const regexSearcher = new RegExp(values[0], 'i')
            notes = (notes as Note[]).filter(nota => regexSearcher.test(nota.title) || regexSearcher.test(nota.content))
            if (!notes.length) return {status: 404, message: 'No se han encontrado notas con esos filtros en titulo o contenido'}
            return {status: 200, data: notes, message: 'Data filtrada'}
        } catch (error: unknown) {
            return {status: 400, message: (error as Error).message}
        }

    }

}