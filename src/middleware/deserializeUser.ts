import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { reIssueAccessToken } from "../service/session.service";
import { verifyJwt } from "../utils/jwt.utils";
import { deserializeUserSchema } from './../schema/user.schema';

export const deserializeUser = async (req:Request , res: Response, next: NextFunction) => {

    const accessToken = get(req, 'headers.authorization')?.replace(/^Bearer\s/,''); // lodash.get -> safe when prop could not exist
    const refreshToken = get<{},string>(req, 'headers.x-refresh'); 
    
    if (!accessToken) return next();

    const { decoded, expired } = verifyJwt(accessToken)

    if (decoded){ // true if valid and not expired
        const userShapeValidStatus = deserializeUserSchema.safeParse(decoded);
        if (userShapeValidStatus.success){
            res.locals.user = decoded;
        } else {
            return res.status(400).send({message:userShapeValidStatus.error})
        }
        return next();
    }

    if (expired && refreshToken){
        const newAccessToken = await reIssueAccessToken({refreshToken});
        if (newAccessToken){
            res.setHeader('x-access', newAccessToken);
        

        const result = verifyJwt(newAccessToken);

        res.locals.user = result.decoded;
        return next();
        }
    }

    return next(); // when no token at all.
}