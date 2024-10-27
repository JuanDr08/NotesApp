import { body } from "express-validator"

export class NotesValidator {
    
    createNoteValidator = () => {
        return [
            body('title').isString().notEmpty().withMessage('Formato de string invalido'),
            body('content').isString().notEmpty().withMessage('Password format invalido'),
        ]
    }

}