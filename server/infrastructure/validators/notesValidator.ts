import { body, oneOf, param, query } from "express-validator"

export class NotesValidator {
    
    createNoteValidator = () => {
        return [
            body('title').isString().notEmpty().withMessage('Formato de string invalido'),
            body('content').isString().notEmpty().withMessage('Password format invalido'),
        ]
    }

    validateIdFromParam = () => {
        return [
            param('id').isMongoId().withMessage('Formato de string invalido'),
        ]
    }

    validateCorrectFieldsToUpdate = () => {
        return [
            body().notEmpty().withMessage('No ha enviado ningun dato a guardar').custom((_value, { req }) => {
                if (!req.body.title && !req.body.content) {
                    throw new Error('Debe proporcionar al menos un titulo o un contenido a editar.');
                }
                return true;
            }),
            body('title').optional().isString().withMessage('Formato de string invalido'),
            body('content').optional().isString().withMessage('Password format invalido'),
        ]
    }

    queryTitleContentSearcherValidator = () => {
        return [
            query().custom((_value : string , {req}) => {
                const allowedFields = ['content', 'title'];
                const queryFields = req.query ? Object.keys(req.query) : []

                const isValid = queryFields.every(field => allowedFields.includes(field));

                if (!isValid) {
                    throw new Error('Solo se permiten los filtros "content" o "title" en la query');
                  }
                return true;

            }),

            oneOf([
                query('content').exists().notEmpty().withMessage('El campo content no puede estar vacío si está presente'),
                query('title').exists().notEmpty().withMessage('El campo title no puede estar vacío si está presente')
            ], {message: 'Se debe enviar al menos uno de los campos: content o title'}),
            
            query('title').optional().trim().notEmpty().withMessage('El titulo no puede estar vacio'),
            query('content').optional().trim().notEmpty().withMessage('El contenido no puede estar vacio')
        ]
    }

}