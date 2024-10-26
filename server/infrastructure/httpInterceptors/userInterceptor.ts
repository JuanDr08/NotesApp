import { Request, Response } from "express"
import { validationResult } from "express-validator"
import bcrypt from "bcryptjs"

import { UserController} from "../../application/controller/userController";

export class UserInterceptor {

    constructor(private readonly userController : UserController) {
    }

    async registerUserInterceptor(req : Request, res : Response) : Promise<void> {

        const errors = validationResult(req);
        if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

        const { email, password } = req.body

        const hashPassword = await bcrypt.hash(password, 10)

        const query = await this.userController.registerUseCase(email, hashPassword)
        res.status(query.status).json(query)
    
    }

    async loginInterceptor(req : Request, res : Response) : Promise<void> {

        const errors = validationResult(req);
        if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });
        const { email, password } = req.body

        const query = await this.userController.loginUseCase(email, password)
        res.cookie('token', `Bearer ${query.token}`, {maxAge: 30 * 60 * 1000 }).status(query.status).json(query)
    
    }

    async verifyTokenInterceptor(req : Request, res : Response) : Promise<void> {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ status:400, authenticated: false, errors: errors.array() });
            return
        }

        const { authorization } = req.headers
        const token = authorization?.split(' ')[1] as string
        const query = await this.userController.verifyTokenUseCase(token)
        res.status(query.status).json(query)
    }

}