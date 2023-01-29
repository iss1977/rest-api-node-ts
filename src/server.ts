import express from 'express';
import type Express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import { deserializeUser } from './middleware/deserializeUser';

export default function createServer() {

    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }))

    app.use(bodyParser.json());
 
    app.use(deserializeUser);

    routes(app);

    app.use((err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
        console.error(err.message)
        res.status(500).send('Something broke!')
    });

    return app;
}