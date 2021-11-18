/* eslint-disable simple-import-sort/imports */
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
// import { SuatAnReferenceDTO } from './dto/suatan-reference.dto';
import { ThongTinLuotKhamDTO } from './dto/thongtinluotkham.dto';
import { ThongTinLuotKhamEntity } from './thongtinluotkham.entity';
// import { SuatAnService } from './suatan.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ThongTinLuotKhamEntity])],
      // services: [SuatAnService],
      resolvers: [
        {
          DTOClass: ThongTinLuotKhamDTO,
          EntityClass: ThongTinLuotKhamEntity,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          referenceBy: { key: 'luotkhamId' },
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
export class ThongTinLuotKhamModule {}
