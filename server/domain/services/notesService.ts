import { MongoId, NoteWithoutHistory, UpdateResponse, User } from "../../shared/types";
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

    async getAllNotesFromUser(userId: MongoId) : Promise<Pick<User, 'notes'>> {
        const query = await this.notesRepository.getAllNotesFromUser(userId)
        if(!query) throw new Error('Error al obtener notas')
        return query
    }

}