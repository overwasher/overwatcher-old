process.env['NODE_CONFIG_DIR'] = __dirname + '/../configs';
import config from 'config';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';

const sendErrorStacktrace = config.get('sendErrorStacktrace');

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || error.httpCode || 500;
    const message: string = error.message || 'Something went wrong';

    console.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    const resp = {
      message,
      stack: sendErrorStacktrace ? error.stack : undefined,
    };
    if (sendErrorStacktrace) resp.stack = error.stack;
    res.status(status).json(resp);
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
