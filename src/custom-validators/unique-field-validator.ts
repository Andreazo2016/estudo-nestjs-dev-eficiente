import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';

import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class isAlreadyUsedConstraint implements ValidatorConstraintInterface {

    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource

    validate(fieldValue: any, args: ValidationArguments) {
      const tableName = args.constraints[0]
      return this.dataSource.query(`
        select ${args.property}
        from ${tableName}
        where ${args.property} = '${fieldValue}'
        limit 1
      `).then(result => {
        const author = result[0]
        if (author) return false
        return true
      })

    }
  }

  export function IsFieldAlreadyExists({ tableName }, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [tableName],
        validator: isAlreadyUsedConstraint,
      });
    };
  }