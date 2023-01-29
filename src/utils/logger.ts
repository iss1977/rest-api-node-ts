//import logger from 'pino';
const pino = require('pino');

//import pino from 'pino'
import pretty from 'pino-pretty'


import dayjs from 'dayjs';

const log = pino(pretty({ sync: true }));

  
// const log = logger({
//     transport: {
//       target: 'pino-pretty',
//       options: {
//         colorize: true
//       },
//     },
//     timestamp: () => `,"time":"${dayjs().format()}"`
// });

export default log;
