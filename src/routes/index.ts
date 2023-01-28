import type { Request, Response} from 'express'
import type { Express } from 'express';
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from '../controller/product.controller';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from '../controller/session.controller';
import { createUserHandler } from '../controller/user.controller';
import requireUser from '../middleware/requireUser';
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from '../schema/product.schema';
import { sessionSchema } from '../schema/session.schema';
import { createUserSchema } from '../schema/user.schema';
import  validateResource  from './../middleware/validateResource';

function routes(app: Express){

    app.get('/heathcheck', (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    app.post('/api/users', validateResource(createUserSchema),  createUserHandler); // validateResource is a curried functions

    app.post('/api/sessions', validateResource(sessionSchema),  createUserSessionHandler); // validateResource is a curried functions

    app.get('/api/sessions', requireUser, getUserSessionsHandler);

    app.delete('/api/sessions', requireUser, deleteSessionHandler);

    app.post('/api/products', requireUser, validateResource(createProductSchema), createProductHandler);

    app.put('/api/products/:productId', requireUser, validateResource(updateProductSchema), updateProductHandler);

    app.get('/api/products/:productId', requireUser, validateResource(getProductSchema), getProductHandler);

    app.delete('/api/products/:productId', requireUser, validateResource(deleteProductSchema), deleteProductHandler);

}

export default routes;
