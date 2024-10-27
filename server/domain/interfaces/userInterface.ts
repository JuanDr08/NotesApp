import type { EmailFormat, InsertionResult, MongoId, NoteHistory, NoteWithoutHistory, UpdateResponse, User, UserNotesHistory } from "../../shared/types.d.ts";

export interface UserRepository {
    findUserByEmail(email: string): Promise<User | undefined>;
    findUserById(id: string): Promise<User | undefined>;
    createUser(email: EmailFormat, password: string): Promise<InsertionResult | undefined>;
    
    addNoteToUser(userId: MongoId, note: NoteWithoutHistory): Promise<UpdateResponse | undefined>;
    getAllNotesFromUser(userId: MongoId): Promise<Pick<User, 'notes'> | undefined>;
    getOneNoteFromUser(userId: MongoId, noteId: MongoId): Promise<UserNotesHistory | undefined>;
    updateNoteFromUser(userId: MongoId, noteId: MongoId, fieldToUpdate: NoteHistory, value: string): Promise<UpdateResponse | undefined>;
    addNoteToUserHistory(userId: MongoId, noteId: MongoId ,note: NoteHistory): Promise<UpdateResponse | undefined>;
    deleteNoteFromUser(userId: MongoId, noteId: MongoId): Promise<UpdateResponse | undefined>;

    obtainNoteHistory(userID: MongoId, noteId: MongoId): Promise<UserNotesHistory | undefined>;
}

export interface UserService {
    verifyPassword(password: string, passwordToCompare: string) : Promise<boolean>
    verifyUserAdmin(user: User) : boolean
}