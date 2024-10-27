import { NotesService } from "../../domain/services/notesService";
import { MongoId, NoteWithoutHistory, StatusResponses } from "../../shared/types";


export class NotesController {

    constructor (
        private readonly notesService : NotesService
    ) {}

    async createNoteUseCasae(userId: MongoId, note: NoteWithoutHistory) : Promise<StatusResponses> {

        try {
            await this.notesService.addNoteToUser(userId, note)
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
}