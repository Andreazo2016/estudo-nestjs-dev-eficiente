import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
import { isCpf, isCnpj } from 'validator-brazil'

@ValidatorConstraint()
export class cpfOrCnpjConstraint implements ValidatorConstraintInterface {

    validate(fieldValue: string, args: ValidationArguments) {
      if (fieldValue.length === 14) return isCnpj(fieldValue)
      return isCpf(fieldValue)
    }
  }

  export function isCpfOrCnpj(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: cpfOrCnpjConstraint,
      });
    };
  }