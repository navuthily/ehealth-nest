/* eslint-disable simple-import-sort/imports */
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { MoiQuanHeBenhNhanEntity } from './benhnhan-quanhe.entity';
import { MoiQuanHeBenhNhanDTO } from './dto/benhnhan-quanhe.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([MoiQuanHeBenhNhanEntity])],
      // services: [Posph66EHService],
      resolvers: [
        {
          DTOClass: MoiQuanHeBenhNhanDTO,
          EntityClass: MoiQuanHeBenhNhanEntity,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          // referenceBy: { key: 'luotkhamId' },
        },
      ],
    }),
  ],
  providers: [],
})
export class MoiQuanHeBenhnhanModule {}
