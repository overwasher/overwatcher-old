import { SensorState } from '@/interfaces/sensorstates.interface';
import { IsNumber, IsString } from 'class-validator';

export class SensorNodeUpdateDto {
  @IsString()
  public state: SensorState;
}

export class SensorNodeRawUpdateDto {
  @IsNumber()
  public averageAcceleration?: number;
}
