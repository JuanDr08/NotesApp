import jwt from 'jsonwebtoken';
import { RequestWithUser, TokenDecoded } from '../../shared/types';
import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';

process.loadEnvFile();

export const auth = async (req : Request, res : Response, next : NextFunction) : Promise<void> => {
    try {
        const token = req.cookies.token?.replace('Bearer ', '');
        if (!token) {
            res.status(401).json({status: 401, message: 'No se proporcionó token de autenticación', authenticated: true})
            return
        }
        const decoded = jwt.verify(token, process.env.KEY_SECRET || 'Defecto') as TokenDecoded

        // Verificar expiración de sesión (30 minutos)
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp && decoded.exp < currentTime) {
            res.status(401).json({status: 401, message: 'Sesión expirada', authenticated: false});
            return
        }

        (req as RequestWithUser).userId = ObjectId.createFromHexString(decoded.id);

        next();
    } catch  {
        res.status(401).json({status: 401, message: 'Token inválido', authenticated: false});
    }
};