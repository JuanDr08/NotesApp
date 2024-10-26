import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
    windowMs: 3 * 60 * 1000, // 3 minutos
    max: 3,
    message: {status: 429, message: 'Espera 3 minutos antes de volver a intentarlo.'}
});

export const getLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 25,
    message: {status : 429, message: 'Tasa superada'}
});

export const postLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 45,
    message: {status : 429, message: 'Tasa superada'}
});

export const deleteLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutos
    max: 10,
    message: {status : 429, message: 'Tasa superada'}
});

export const putLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 45,
    message: {status : 429, message: 'Tasa superada'}
});