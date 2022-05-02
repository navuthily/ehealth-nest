import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { ModuleRef } from '@nestjs/core';
import { Connection, Repository } from 'typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  import { getRepository } from "typeorm" 
import { ThoigianlichhenkhamngayEntity } from '../../../apps/gateway/src/gd2_thoigianlichhenkhamngay/thoigianlichhenkhamngay.entity'

  
  @ValidatorConstraint({ name: 'IsUserAlreadyExist', async: true })
  @Injectable() 
  export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
    async validate(code: string) {
      //,await getRepository(ThoigianlichhenkhamngayEntity).find()
      console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
      
      try {
        return false
      } catch (e) {
        return false;
      }
      return true;
    }
    defaultMessage() {
      return `companyCode doesn't exist`;
    }
  }
  
  export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsUserAlreadyExistConstraint,
      });
    };
  }

  