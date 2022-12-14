import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import  config  from "../config/config"


export const checkJwt = (req:Request, res: Response, next: NextFunction) =>{
    const token =<string>req.headers['auth'];
    console.log(token);
    let jwtPayload;
    try {
        jwtPayload=jwt.verify(token,config.jwtSecret)
        res.locals.jwtPayload=jwtPayload;
        console.log(jwtPayload);
    } catch (error) {
        res.status(401).json({
            message: 'wrong token',
            error
        })
    }
    const {empleadoId}= jwtPayload
    const newToken=jwt.sign({empleadoId}, config.jwtSecret, {expiresIn: '1h'})

    res.setHeader('auth', newToken)
    next()
}