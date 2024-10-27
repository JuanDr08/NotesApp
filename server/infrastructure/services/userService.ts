// Interfaces o Repositorios
import { UserService } from "../../domain/interfaces/userInterface";

// Librerias
import bcrypt from 'bcryptjs'
import { User } from "../../shared/types";


export class UserServiceImpl implements UserService {

    async verifyPassword(password: string, passwordToCompare: string): Promise<boolean> {
        return await bcrypt.compare(password, passwordToCompare)
    }

    verifyUserAdmin(user: User): boolean {
        return user.role === "admin"
    }

}