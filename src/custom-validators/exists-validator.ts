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
export class existsConstraint implements ValidatorConstraintInterface {

    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource

    validate(fieldValue: any, args: ValidationArguments) {
      const tableName = args.constraints[0]
      const property = args.constraints[1] ?? args.property
      return this.dataSource.query(`
        select ${property}
        from ${tableName}
        where ${property} = '${fieldValue}'
        limit 1
      `).then(result => {
        const item = result[0]
        if (item) return true
        return false
      })

    }
  }

  export function IsExists({ tableName, field }, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [tableName, field],
        validator: existsConstraint,
      });
    };
  }