import { Controller, Param, Body, Get, Post, Put, Delete, HttpCode, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { SensorNodeUpdateDto } from '@dtos/SensorNodeUpdate.dto';
import userService from '@services/users.service';
import sensornodeAuthMiddleware from '@middlewares/sensornodeAuth.middleware';
import { logger } from '@/utils/logger';

@Controller()
@UseBefore(sensornodeAuthMiddleware)
@OpenAPI({ summary: 'Interact with sensor nodes', description: 'Requires device token to call' })
export class SensorNodeController {
  public userService = new userService();

  @Post('/sensor/v1/update')
  @OpenAPI({ summary: 'Post a sensor node state update' })
  async postUpdate(@Body() update: SensorNodeUpdateDto) {
    logger.info('Update: ' + JSON.stringify(update));
    return 'OK';
  }
}
