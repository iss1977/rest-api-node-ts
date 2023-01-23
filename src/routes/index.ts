import type { Request, Response} from 'express'
import type { Express } from 'express';
import { createUserHandler } from '../controller/user.controller';
import { createUserSchema } from '../schema/user.schema';
import  validateResource  from './../middleware/validateResource';

function routes(app: Express){

    app.get('/heathcheck', (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    app.post('/api/users', validateResource(createUserSchema),  createUserHandler); // validateResource is a curried functions
}

export default routes;
