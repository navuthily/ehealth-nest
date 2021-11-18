import {
  FilterableField,
} from '@nestjs-query/query-graphql';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType('DMBenhNhan')
// @Directive('@key(fields: "luotkhamId")')
// @Reference(
//   'posph66EH',
//   () => Posph66EHReferenceDTO,
//   { luotkhamId: 'luotkhamId' },
//   { nullable: true },
// )
export class DMBenhNhanDTO {
  @FilterableField(() => ID)
  benhnhanId!: number;

  @FilterableField({ nullable: true })
  namsinh?: number;

  @FilterableField({ nullable: true })
  ngaythangnamsinh?: Date;

  @Field({ nullable: true })
  tuoi?: string;
}
