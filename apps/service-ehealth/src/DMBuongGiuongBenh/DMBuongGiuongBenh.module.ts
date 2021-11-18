/* eslint-disable simple-import-sort/imports */
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { DMBuongGiuongBenhDTO } from './dto/DMBuongGiuongBenh.dto';
import { DMBuongGiuongBenhEntity } from './DMBuongGiuongBenh.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([DMBuongGiuongBenhEntity])],
      // services: [Posph66EHService],
      resolvers: [
        {
          DTOClass: DMBuongGiuongBenhDTO,
          EntityClass: DMBuongGiuongBenhEntity,
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
export class DMBuongGiuongBenhModule {}
