import { MongoId, NoteHistory, NoteWithoutHistory, UpdateResponse, UserNotesHistory } from "../../shared/types";
import { UserRepository, 
//    UserService as UserServiceInterface
} from "../interfaces/userInterface";


export class NotesService {

    constructor (
        private readonly notesRepository : UserRepository,
        //private readonly notesService : UserServiceInterface
    ) {}

    async addNoteToUser(userId: MongoId, note: NoteWithoutHistory) : Promise<UpdateResponse> {

        //if(user.role !== 'admin') throw new Error('No tiene permisos para crear notas')

        const query = await this.notesRepository.addNoteToUser(userId, note)
        if (!query) throw new Error('Error al insertar nota')
        return query
    
    }

    async getAllNotesFromUser(userId: MongoId) : Promise<UserNotesHistory> {
        const query = await this.notesRepository.getAllNotesFromUser(userId)
        if(!query) throw new Error('Error al obtener notas')
        return query
    }

    async getOneNoteFromUser(userId: MongoId, noteId: MongoId) : Promise<UserNotesHistory | undefined> {
        const query = await this.notesRepository.getOneNoteFromUser(userId, noteId)
        if(!query) throw new Error('Error al obtener nota')
        return query
    }

    async updateNote(userId: MongoId, noteId: MongoId, field: Partial<NoteHistory>, value: string) : Promise<UpdateResponse | undefined> {
        const query = await this.notesRepository.updateNoteFromUser(userId, noteId, field, value)
        if(!query) throw new Error('Error al actualizar nota')
        return query
    }

    async addNoteToUserHistory(userId: MongoId, noteId : MongoId, note: NoteWithoutHistory) : Promise<UpdateResponse | undefined> {
        const query = await this.notesRepository.addNoteToUserHistory(userId, noteId, note)
        if(!query) throw new Error('Error al añadir nota a historial')
        return query
    }

    async deleteNote(userId: MongoId, noteId: MongoId) : Promise<UpdateResponse | undefined> {
        const query = await this.notesRepository.deleteNoteFromUser(userId, noteId)
        if(!query) throw new Error('Error al eliminar nota')
        return query
    }

    async getNoteHistory(userId: MongoId, noteId: MongoId) : Promise<UserNotesHistory | undefined> {
        const query = await this.notesRepository.obtainNoteHistory(userId, noteId)
        if(!query) throw new Error('Error al obtener historial de nota')
        return query
    }

}