import type { MongoId, TokenDecoded } from "../../shared/types.d.ts"

export interface TokenService {
    generateToken(id: MongoId) : Promise<string>
    verifyToken(token: string) : TokenDecoded
}