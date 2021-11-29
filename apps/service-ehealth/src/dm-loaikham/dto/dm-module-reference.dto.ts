// import {
//   CursorConnection,
//   OffsetConnection,
// } from '@nestjs-query/query-graphql';
import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';
// import { SuatAnDTO } from './suatan.dto';

@ObjectType('ModuleThanhVien')
@Directive('@extends')
@Directive('@key(fields: "id")')
// @OffsetConnection('suanans', () => SuatAnDTO)
export class DMModuleReferenceDTO {
  @Field(() => ID)
  @Directive('@external')
  id!: number;
}

