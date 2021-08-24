import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint()
export class SensorState implements ValidatorConstraintInterface {
  validate(state: string) {
    return state === 'active' || state === 'inactive';
  }
}
