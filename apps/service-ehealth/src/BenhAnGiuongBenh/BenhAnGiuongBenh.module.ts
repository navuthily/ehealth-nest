/* eslint-disable simple-import-sort/imports */
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { BenhAnGiuongBenhDTO } from './dto/BenhAnGiuongBenh.dto';
import { BenhAnGiuongBenhEntity } from './BenhAnGiuongBenh.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([BenhAnGiuongBenhEntity])],
      // services: [Posph66EHService],
      resolvers: [
        {
          DTOClass: BenhAnGiuongBenhDTO,
          EntityClass: BenhAnGiuongBenhEntity,
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
export class BenhAnGiuongBenhModule {}
