// Interfaces o Repositorios
import { UserRepository } from "../../domain/interfaces/userInterface";

// Modelos
import { UserModel } from "../models/userModel";

// Types
import { EmailFormat, InsertionResult, User } from "../../shared/types";

// Base de datos
import { ConnectToDatabase } from "../database";


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

}