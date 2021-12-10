/* eslint-disable simple-import-sort/imports */
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
// import { SuatAnReferenceDTO } from './dto/suatan-reference.dto';
import { ThongTinBenhVienDTO } from './dto/thongtinbenhvien.dto';
import { ThongTinBenhVienEntity } from './thongtinbenhvien.entity';
// import { SuatAnService } from './suatan.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ThongTinBenhVienEntity])],
      // services: [SuatAnService],
      resolvers: [
        {
          DTOClass: ThongTinBenhVienDTO,
          EntityClass: ThongTinBenhVienEntity,
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
export class ThongTinBenhVienModule {}
