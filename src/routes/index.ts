import type { Request, Response} from 'express'
import type { Express } from 'express';

function routes(app: Express){

    app.get('/heathcheck', (req: Request, res: Response) => {
        res.sendStatus(200);
    });
}

export default routes;
