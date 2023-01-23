import mongoose from "mongoose";
import config from 'config'
import { exit } from "process";
import logger from './logger';

export default function connect(){
    const dbUri = config.get<string>('dbUri')
    mongoose.set('strictQuery', false);
    return mongoose.connect(dbUri)
    .then( () => {
        logger.info('Connected to MongoDB');
    })
    .catch( (error: any) => {
        logger.error('Could not connect to DB');
        exit(1);
    });
}
