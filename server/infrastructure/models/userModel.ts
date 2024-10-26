import { Document, InsertOneResult, ObjectId, WithId } from "mongodb";
import { ConnectToDatabase } from "../database";

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
        const result = await collection?.insertOne({email, password})
        return result
    }

}