// Interfaces o Repositorios
import { UserService } from "../../domain/interfaces/userInterface";

// Librerias
import bcrypt from 'bcryptjs'


export class UserServiceImpl implements UserService {

    async verifyPassword(password: string, passwordToCompare: string): Promise<boolean> {
        return await bcrypt.compare(password, passwordToCompare)
    }

}