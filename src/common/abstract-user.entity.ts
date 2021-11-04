import { Injectable } from '@nestjs/common';
import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';
import type { Constructor } from '../types';
import { AbstractEntity } from './abstract.entity';
import type { AbstractUserDto } from './dto/abstract-user.dto';

export abstract class AbstractUserEntity extends AbstractEntity {
  @Column()
  createdBy: string;

  @Column()
  updatedBy: string;
}
