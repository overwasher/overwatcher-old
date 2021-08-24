import { Controller, Param, Body, Get, Post, Put, Delete, HttpCode, UseBefore, Req } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import sensorStatesService from '@/services/sensorstates.service';

@Controller()
export class SensorsStatusController {
  @Get('/status/v1')
  @OpenAPI({ summary: 'Get a sensors state dump' })
  async postUpdate() {
    return sensorStatesService.dump();
  }
}
