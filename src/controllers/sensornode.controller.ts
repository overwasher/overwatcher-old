import { Controller, Param, Body, Get, Post, Put, Delete, HttpCode, UseBefore, Req } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { SensorNodeUpdateDto } from '@dtos/SensorNodeUpdate.dto';
import sensornodeAuthMiddleware from '@middlewares/sensornodeAuth.middleware';
import { logger } from '@/utils/logger';
import sensorStatesService from '@/services/sensorstates.service';
import { RequestWithSensorId } from '@/interfaces/sensorstates.interface';
import { validationMiddleware } from '@/middlewares/validation.middleware';

@Controller()
@UseBefore(sensornodeAuthMiddleware)
export class SensorNodeController {
  @Post('/sensor/v1/update')
  @UseBefore(validationMiddleware(SensorNodeUpdateDto, 'body'))
  @OpenAPI({ summary: 'Post a sensor node state update' })
  async postUpdate(@Req() req: RequestWithSensorId, @Body() update: SensorNodeUpdateDto) {
    sensorStatesService.update(req.sensorId, update.state);
    return 'OK';
  }
}
