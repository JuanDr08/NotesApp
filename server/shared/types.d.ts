import { ObjectId, InsertOneResult, UpdateResult, Document } from "mongodb";
import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export type EmailFormat = `${string}@${string}.${string}`;

export type MongoId = ObjectId;
export type InsertionResult = InsertOneResult;
export type UpdateResponse = UpdateResult<Document>;

export interface TokenDecoded extends JwtPayload  {
    id: string
}

export interface AuthRequest extends Request {
    token: string
    user: TokenDecoded
}

export interface Note {
    readonly id: MongoId
    readonly title: string
    readonly content: string
}

export interface User {
    readonly _id: MongoId
    readonly email: EmailFormat
    readonly password: string
    readonly notes?: Array<Note>
}

export type UserWithoutPassword = Omit<User, 'password'>


export interface StatusResponses {
    readonly status: number
    readonly message?: string | unknown
    readonly data?: Array<object> | object
    readonly authenticated?: boolean
    readonly token?: string

}