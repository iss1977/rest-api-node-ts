import { NextFunction, Request, Response } from "express";

const requireUser = ( req: Request, res: Response, next: NextFunction) => {

    const user = res.locals.user;

    if(!user) return res.status(403).send({ message: 'No valid user logged in.' });

    return next();
}

export default requireUser;