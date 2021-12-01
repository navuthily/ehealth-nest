/* eslint-disable simple-import-sort/imports */
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
// import { SuatAnReferenceDTO } from './dto/suatan-reference.dto';
import { DMLoaiKhamDTO } from './dto/dm-loaikham.dto';
import { DMLoaiKhamEntity } from './dm-loaikham.entity';
import { DMModuleLoaiKhamDTO } from './dto/dm-module-loaikham.dto';
import { DMModuleLoaiKhamEntity } from './dm-module-loaikham.entity';
// import { SuatAnService } from './suatan.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([DMLoaiKhamEntity,DMModuleLoaiKhamEntity])],
      // services: [SuatAnService],
      resolvers: [
        {
          DTOClass: DMLoaiKhamDTO,
          EntityClass: DMLoaiKhamEntity,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          // referenceBy: { key: 'luotkhamId' },
        },
        {
          DTOClass: DMModuleLoaiKhamDTO,
          EntityClass: DMModuleLoaiKhamEntity,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          // referenceBy: { key: 'luotkhamId' },
        },
        // {
        //   type: 'federated',
        //   DTOClass: SuatAnReferenceDTO,
        //   Service: SuatAnService,
        // },
      ],
    }),
  ],
  providers: [],
})
export class DMLoaiKhamModule {}
