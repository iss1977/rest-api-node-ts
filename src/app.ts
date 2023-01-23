import express from 'express';
import config from 'config';
import connect from './utils/connectDb';
import logger from './utils/logger';
import routes from './routes';


const app = express();
const port = config.get<number>('port');

app.use(express.json());

app.listen(port, async () => {
    logger.info(`Server running on port ${port}`);
    const mongoConnection = await connect();
    routes(app);
});


