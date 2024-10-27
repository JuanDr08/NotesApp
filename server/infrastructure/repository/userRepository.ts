// Interfaces o Repositorios
import { UserRepository } from "../../domain/interfaces/userInterface";

// Modelos
import { UserModel } from "../models/userModel";

// Types
import { EmailFormat, InsertionResult, MongoId, NoteHistory, NoteWithoutHistory, UpdateResponse, User, UserNotesHistory } from "../../shared/types";

// Base de datos
import { ConnectToDatabase } from "../database";
import { ObjectId } from "mongodb";


export class UserRepositoryImpl implements UserRepository {

    async findUserByEmail(email: string): Promise<User | undefined> {
        
        const query = await UserModel.findUserByEmail(email)
        if(!query) return undefined
        return query as User

    }

    async findUserById(id: string): Promise<User | undefined> {
        
        const query = await UserModel.findUserById(id)
        if(!query) return undefined
        return query as User

    }

    async createUser(email: EmailFormat, password: string): Promise<InsertionResult | undefined> {
        const session = ConnectToDatabase.instanceConnect.session
        try {
            session?.startTransaction()
            const query = await UserModel.createUser(email, password)
            if (!query?.acknowledged) return undefined
            session?.commitTransaction()
            return query
        } catch {
            session?.abortTransaction()
            return undefined
        } finally {
            session?.endSession()
        }
        
    }

    async addNoteToUser(userId: MongoId, note: NoteWithoutHistory): Promise<UpdateResponse | undefined> {
        const session = ConnectToDatabase.instanceConnect.session
        try {
            session?.startTransaction()
            note.id = new ObjectId()
            const query = await UserModel.addNoteToUser(userId, note)
            if (!query?.acknowledged) return undefined
            session?.commitTransaction()
            return query
        } catch {
            session?.abortTransaction()
            return undefined
        } finally {
            session?.endSession()
        }
    }

    async updateNoteFromUser(userId: MongoId,
        noteId: MongoId,
        fieldToUpdate: Partial<NoteHistory>,
        value: string): Promise<UpdateResponse | undefined> { 

            const session = ConnectToDatabase.instanceConnect.session
            try {
                session?.startTransaction()
                const query = await UserModel.updateNoteFromUser(userId, noteId, fieldToUpdate, value)
                if (!query?.acknowledged) return undefined
                session?.commitTransaction()
                return query
            } catch {
                session?.abortTransaction()
                return undefined
            } finally {
                session?.endSession()
            }
        }
    
    async addNoteToUserHistory(
        userId: MongoId, 
        noteId: MongoId, 
        note: NoteHistory): Promise<UpdateResponse | undefined> {

        const session = ConnectToDatabase.instanceConnect.session
        try {
            session?.startTransaction()
            const query = await UserModel.addNoteToUserHistory(userId, noteId, note)
            if (!query?.acknowledged) return undefined
            session?.commitTransaction()
            return query
        } catch {
            session?.abortTransaction()
            return undefined
        } finally {
            session?.endSession()
        }
    }

    async deleteNoteFromUser(userId : MongoId,
        noteId: MongoId): Promise<UpdateResponse | undefined> {

        const session = ConnectToDatabase.instanceConnect.session
        try {
            session?.startTransaction()
            const query = await UserModel.deleteNoteFromUser(userId, noteId)
            if (!query?.acknowledged) return undefined
            session?.commitTransaction()
            return query
        } catch {
            session?.abortTransaction()
            return undefined
        } finally {
            session?.endSession()
        }
    }

    async obtainNoteHistory(userId: MongoId, noteId: MongoId): Promise<UserNotesHistory | undefined> {
        const query = await UserModel.obtainNoteHistory(userId, noteId)
        if(!query) return undefined
        return query 
    }
    
    async getAllNotesFromUser(userId: MongoId): Promise<Pick<User, 'notes'> | undefined> {
        const query = await UserModel.getAllNotesFromUser(userId)
        if(!query) return undefined
        return query 
    }

    async getOneNoteFromUser(userId: MongoId, noteId: MongoId): Promise<UserNotesHistory | undefined> {
        const query = await UserModel.getOneNoteFromUser(userId, noteId)
        if(!query) return undefined
        return query 
    }

}