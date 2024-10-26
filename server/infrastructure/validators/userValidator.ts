import { body, header } from "express-validator"

export class UserValidator {
    
    registerUserValidator = () => {
        return [
            body('email').isEmail().withMessage('Formato de email invalido'),
            body('password').isNumeric().withMessage('Password format invalido'),
        ]
    }

    tokenHeaderValidator = () => {
        return [
            header('Authorization')
            .exists().withMessage('El header authorization es obligatorio')
        ]
    }

}