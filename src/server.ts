process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import 'reflect-metadata';
import App from '@/app';
import { IndexController } from '@controllers/index.controller';
import { SensorNodeController } from './controllers/sensornode.controller';
import validateEnv from '@utils/validateEnv';
import { SensorsStatusController } from './controllers/status.controller';

validateEnv();

const app = new App([IndexController, SensorNodeController, SensorsStatusController]);
app.listen();
