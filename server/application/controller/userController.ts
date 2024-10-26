import { EmailFormat, StatusResponses } from "../../shared/types";
import { UserService } from "../../domain/services/userService";
import { TokenService } from "../../domain/interfaces/tokenInterface";

export class UserController {

    constructor (
        private readonly userService : UserService,
        private readonly tokenService : TokenService
    ) {}

    async registerUseCase(email: EmailFormat, password: string) : Promise<StatusResponses> {

        try {
            const query = await this.userService.registerUserService(email, password)
            const generateToken = await this.tokenService.generateToken(query._id)
            return {status: 200, data: query, message: 'Usuario registrado', token: generateToken}
        } catch (error: unknown) {

            return {status: 400, message: (error as Error).message}
        }
        
    
    }

    async loginUseCase(email: EmailFormat, password: string) : Promise<StatusResponses> {

        try {
            const query = await this.userService.loginUserService(email, password)

            const generateToken = await this.tokenService.generateToken(query._id)

            const data = {
                id: query._id,
                email: query.email
            }

            return {status: 200, data: data, message: 'Usuario logueado', token: generateToken}
        } catch (error: unknown) {
            return {status: 400, message: (error as Error).message}
        }
        
    }

    async verifyTokenUseCase(token: string) : Promise<StatusResponses> {

        try {
            const query = await this.tokenService.verifyToken(token)
            return {status: 200, data: query, message: 'Token verificado', authenticated: true}
        } catch (error: unknown) {
            return {status: 400, message: (error as Error).message, authenticated: false}
        }
    }

}