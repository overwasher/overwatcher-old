import { IsString } from 'class-validator';

export class SensorNodeUpdateDto {
  @IsString()
  public state: string;
}
