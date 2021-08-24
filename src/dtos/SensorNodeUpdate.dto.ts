import { SensorState } from '@/interfaces/sensorstates.interface';
import { IsString } from 'class-validator';

export class SensorNodeUpdateDto {
  @IsString()
  public state: SensorState;
}
