import jwt from "jsonwebtoken"
import { TokenService } from "../../domain/interfaces/tokenInterface"
import { TokenDecoded, MongoId } from "../../shared/types"

export class TokenServiceImpl implements TokenService {

    async generateToken(id: MongoId): Promise<string> {
        
        const secret = process.env.KEY_SECRET || 'Defecto'
        console.log(typeof id, id)
        return jwt.sign({id}, secret, {expiresIn: '30m'})

    }

    verifyToken(token: string): TokenDecoded {
        
        const secret = process.env.KEY_SECRET || 'Defecto'
        const verificacion = jwt.verify(token, secret)
        return verificacion as TokenDecoded

    }

}