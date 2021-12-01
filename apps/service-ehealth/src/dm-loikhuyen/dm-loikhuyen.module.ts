/* eslint-disable simple-import-sort/imports */
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
// import { SuatAnReferenceDTO } from './dto/suatan-reference.dto';
import { DMLoiKhuyenDTO } from './dto/dm-loikhuyen.dto';
import { DMLoiKhuyenEntity } from './dm-loikhuyen.entity';
// import { SuatAnService } from './suatan.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([DMLoiKhuyenEntity])],
      // services: [SuatAnService],
      resolvers: [
        {
          DTOClass: DMLoiKhuyenDTO,
          EntityClass: DMLoiKhuyenEntity,
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
export class DMLoiKhuyenModule {}
