/* eslint-disable simple-import-sort/imports */
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { DMBenhNhanDTO } from './dto/dmbenhnhan.dto';
import { DMBenhNhanEntity } from './dmbenhnhan.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([DMBenhNhanEntity])],
      // services: [Posph66EHService],
      resolvers: [
        {
          DTOClass: DMBenhNhanDTO,
          EntityClass: DMBenhNhanEntity,
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
export class DMBenhNhanModule {}
