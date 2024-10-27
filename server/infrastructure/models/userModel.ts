import { Collection, Document, InsertOneResult, ObjectId, WithId } from "mongodb";
import { ConnectToDatabase } from "../database";
import { MongoId, Note, NoteHistory, NoteWithoutHistory, UpdateResponse, User, UserNotesHistory } from "../../shared/types";

export class UserModel {

    static async findUserByEmail(value: string): Promise<WithId<Document> | null | undefined> {
        const db = ConnectToDatabase.instanceConnect
        const collection = db.db?.collection('usuario')
        const result = await collection?.findOne({email: value})
        return result
    }

    static async findUserById(value: string): Promise<WithId<Document> | null | undefined> {
        const db = ConnectToDatabase.instanceConnect
        const collection = db.db?.collection('usuario')
        const result = await collection?.findOne({_id: ObjectId.createFromHexString(value)})
        return result
    }

    static async createUser(email: string, password: string): Promise<InsertOneResult<Document> | undefined> {
        const db = ConnectToDatabase.instanceConnect
        const collection = db.db?.collection('usuario')
        const result = await collection?.insertOne({email, password, role: 'standard'})
        return result
    }

    static async getAllNotesFromUser(userId: MongoId): Promise<UserNotesHistory | undefined> {
        const db = ConnectToDatabase.instanceConnect
        const collection : Collection<User> | undefined = db.db?.collection('usuario')
        const result = await collection?.findOne({_id: userId}, {projection: {'notes': 1, _id: 0}}) as UserNotesHistory
        return result
    }

    static async getOneNoteFromUser(userId: MongoId, noteId: MongoId): Promise<UserNotesHistory | undefined> {
        const db = ConnectToDatabase.instanceConnect
        const collection : Collection<User> | undefined = db.db?.collection('usuario')
        const result = await collection?.findOne({_id: userId, 'notes.id': noteId}, {projection: {'notes.$': 1, _id: 0}}) as UserNotesHistory | undefined
        return result
    }

    static async addNoteToUser(userId: MongoId, note: NoteWithoutHistory): Promise<UpdateResponse | undefined> {
        const db = ConnectToDatabase.instanceConnect
        const collection : Collection<User> | undefined = db.db?.collection('usuario')
        const result = await collection?.updateOne({_id: userId}, {$push: {notes: note}})
        return result
    }

    static async updateNoteFromUser(userId: MongoId, noteId: MongoId, fieldToUpdate: Partial<Note>, value: string): Promise<UpdateResponse | undefined> {
        const db = ConnectToDatabase.instanceConnect
        const collection : Collection<User> | undefined = db.db?.collection('usuario')
        const field = `notes.$.${[fieldToUpdate]}`
        const result = await collection?.updateOne({_id : userId, "notes.id": noteId.id}, {$set: {[field]: value}})
        return result
    }

    static async addNoteToUserHistory(userId: MongoId, noteId: MongoId, note: NoteHistory): Promise<UpdateResponse | undefined> {
        const db = ConnectToDatabase.instanceConnect
        const collection : Collection<User> | undefined = db.db?.collection('usuario')
        const result = await collection?.updateOne({_id: userId, 'notes.id' : noteId}, {$push: {"notes.$.history": note}})
        return result
    }

    static async deleteNoteFromUser(userId: MongoId, noteId: MongoId): Promise<UpdateResponse | undefined> {
        const db = ConnectToDatabase.instanceConnect
        const collection : Collection<User> | undefined = db.db?.collection('usuario')
        const result = await collection?.updateOne({_id: userId}, {$pull: {notes: {id: noteId}}})
        return result
    }

    static async obtainNoteHistory(userId: MongoId, noteId: MongoId): Promise<UserNotesHistory | undefined> {
        const db = ConnectToDatabase.instanceConnect
        const collection : Collection<User> | undefined = db.db?.collection('usuario')
        const result = await collection?.findOne({_id: userId, 'notes.id': noteId}, {projection: {'notes.$': 1, _id: 0}}) as UserNotesHistory
        return result
    }

}