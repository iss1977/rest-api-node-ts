
import config from 'config';
import connect from './utils/connectDb';
import logger from './utils/logger';
import server from './server';


const port = config.get<number>('port');

const app = server();

app.listen(port, async () => {
    logger.info(`Server running on port ${port}`);
    const mongoConnection = await connect();
    
});


