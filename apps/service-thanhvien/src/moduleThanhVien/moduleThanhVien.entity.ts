import { Injectable } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';
@ObjectType()
@Injectable()
@Entity('module')
export class ModuleThanhVienEntity {
  @PrimaryColumn({ name: 'id' })
  @Field({nullable: true})
  id!: number;

  @Column({ name: 'module_name' })
  @Field({nullable: true})
  moduleName?: string;

  @Column({ name: 'nhom_id' })
  @Field({nullable: true})
  nhomId?: number;
}
