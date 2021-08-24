process.env['NODE_CONFIG_DIR'] = __dirname + '/../configs';
import config from 'config';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithSensorId } from '@/interfaces/sensorstates.interface';

const stubSensorAuth = config.get('stubSensorAuth');

const sensornodeAuthMiddleware = async (req: RequestWithSensorId, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.header('Authorization').split('Bearer ')[1] || null;

    // TODO: use another JWT token & extract device id & location from it

    if (Authorization) {
      if (stubSensorAuth) {
        // for stub auth we don't treat auth token as a jwt and use it as sensor id instead
        req.sensorId = Authorization;
      } else {
        throw 'Proper auth not implemented yet';
      }
      next();
      /*const secretKey: string = config.get('secretKey');
      const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse.id;
      const findUser = userModel.find(user => user.id === userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }*/
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default sensornodeAuthMiddleware;
