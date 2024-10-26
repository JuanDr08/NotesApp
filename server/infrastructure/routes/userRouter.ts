// librerias
import express, { Request, Response } from "express"
import cookieParser from "cookie-parser"

// Middlewares
import { postLimiter, loginLimiter } from "../middlewares/rateLimit"
// import { auth } from "../middlewares/auth"

// Validators
import { UserValidator } from "../validators/userValidator"

// Dependencias
import { userInterceptor } from "../dependencies"

// Constants
const userValidator = new UserValidator()
const router = express.Router()

router.post('/',
    express.json(),
    postLimiter,
    userValidator.registerUserValidator(),
    async (req: Request, res: Response) => {
        const loadUserInterceptor = await userInterceptor()
        loadUserInterceptor.registerUserInterceptor(req, res)
    }

)

router.post('/login',
    express.json(),
    cookieParser(),
    loginLimiter,
    userValidator.registerUserValidator(),
    async (req: Request, res: Response) => {
        const loadUserInterceptor = await userInterceptor()
        loadUserInterceptor.loginInterceptor(req, res)
    }
)

export default router