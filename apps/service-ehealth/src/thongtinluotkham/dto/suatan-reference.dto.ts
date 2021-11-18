// import {
//   // CursorConnection,
//   // OffsetConnection,
//   Relation
// } from '@nestjs-query/query-graphql';
// import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';
// import { ThongTinLuotKhamDTO } from './thongtinluotkham.dto';
// // import { SuatAnDTO } from './suatan.dto';

// @ObjectType('SuatAn')
// @Directive('@extends')
// @Directive('@key(fields: "luotkhamId")')
// @Relation('thongtinluotkham', () => ThongTinLuotKhamDTO, {nullable: true}) // Cho phép trả về giá trị null thay vì báo lỗi
// export class SuatAnReferenceDTO {
//   @Field()
//   @Directive('@external')
//   luotkhamId!: number;
// }
