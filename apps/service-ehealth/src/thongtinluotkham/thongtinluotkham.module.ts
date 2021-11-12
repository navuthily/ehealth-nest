/* eslint-disable simple-import-sort/imports */
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { ThongTinLuotKhamDTO } from './dto/thongtinluotkham.dto';
import { ThongTinLuotKhamEntity } from './thongtinluotkham.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ThongTinLuotKhamEntity])],
      resolvers: [
        {
          DTOClass: ThongTinLuotKhamDTO,
          EntityClass: ThongTinLuotKhamEntity,
          referenceBy: { key: 'nhanvienId' },
        },
      ],
    }),
  ],
  providers: [],
})
export class ThongTinLuotKhamModule {}
