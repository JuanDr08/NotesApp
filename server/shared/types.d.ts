import { ObjectId, InsertOneResult, UpdateResult, Document } from "mongodb";
import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export type EmailFormat = `${string}@${string}.${string}`;

export type MongoId = ObjectId;
export type InsertionResult = InsertOneResult;
export type UpdateResponse = UpdateResult<Document>;

export interface RequestWithUser extends Request {
    userId: string
}

export interface TokenDecoded extends JwtPayload  {
    id: string
}

export type NoteHistory = Omit<Note, 'id' | 'history'>

export interface Note {
    id?: MongoId
    readonly title: string
    readonly content: string
    readonly history?: Array<NoteHistory>
}

export type NoteWithoutHistory = Omit<Note, 'history'>

export interface User {
    readonly _id: MongoId
    readonly role: 'admin' | 'standard'
    readonly email: EmailFormat
    readonly password: string
    readonly notes?: Array<Note>
}

export type UserNotesHistory = Pick<User, 'notes'>

export type UserWithoutPassword = Omit<User, 'password'>


export interface StatusResponses {
    readonly status: number
    readonly message?: string | unknown
    readonly data?: Array<object> | object
    readonly authenticated?: boolean
    readonly token?: string

}