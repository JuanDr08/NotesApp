import type { EmailFormat, InsertionResult, User } from "../../shared/types.d.ts";

export interface UserRepository {
    findUserByEmail(email: string): Promise<User | undefined>;
    findUserById(id: string): Promise<User | undefined>;
    createUser(email: EmailFormat, password: string): Promise<InsertionResult | undefined>;
}

export interface UserService {
    verifyPassword(password: string, passwordToCompare: string) : Promise<boolean>
}