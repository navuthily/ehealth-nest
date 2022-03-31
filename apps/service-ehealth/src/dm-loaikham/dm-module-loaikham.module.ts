/* eslint-disable simple-import-sort/imports */
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
// import { SuatAnReferenceDTO } from './dto/suatan-reference.dto';
import { DMModuleLoaiKhamDTO } from './dto/dm-module-loaikham.dto';
import { DMModuleLoaiKhamEntity } from './dm-module-loaikham.entity';
import { DMModuleLoaikhamResolver } from './dm-module-loaikham.resolver';
// import { SuatAnService } from './suatan.service';

@Module({
  // imports: [
  //   NestjsQueryGraphQLModule.forFeature({
  //     imports: [NestjsQueryTypeOrmModule.forFeature([DMModuleLoaiKhamDTO])],
  //     // services: [SuatAnService],
  //     resolvers: [
  //       {
  //         DTOClass: DMModuleLoaiKhamDTO,
  //         EntityClass: DMModuleLoaiKhamEntity,
  //         create: { disabled: true },
  //         update: { disabled: true },
  //         delete: { disabled: true },
  //         // referenceBy: { key: 'luotkhamId' },
  //       },
  //       // {
  //       //   type: 'federated',
  //       //   DTOClass: SuatAnReferenceDTO,
  //       //   Service: SuatAnService,
  //       // },
  //     ],
  //   }),
  // ],
  providers: [DMModuleLoaikhamResolver],
})
export class DMModuleLoaiKham {}
