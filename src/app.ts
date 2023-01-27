import express from 'express';
import type Express from 'express';
import config from 'config';
import connect from './utils/connectDb';
import logger from './utils/logger';
import routes from './routes';
import bodyParser from 'body-parser';
import { deserializeUser } from './middleware/deserializeUser';

const app = express();
const port = config.get<number>('port');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());
// parse application/json
// app.use((req, res, next) => {
//     const parseRezult = bodyParser.json(); 
//     const errorHandler = (req, res, err) => {
//         if (err) {
//             console.error(err.message);
//             return res.sendStatus(400); // Bad request
//         }
//         next();
//     };
//     parseRezult(errorHandler);
    
// });

app.use(deserializeUser);

app.use((err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    console.error(err.message)
    res.status(500).send('Something broke!')
});



app.listen(port, async () => {
    logger.info(`Server running on port ${port}`);
    const mongoConnection = await connect();
    routes(app);
});


