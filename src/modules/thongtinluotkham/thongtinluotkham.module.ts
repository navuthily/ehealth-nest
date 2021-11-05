/* eslint-disable simple-import-sort/imports */
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';
import { ThongTinLuotKhamDTO } from './dto/thongtinluotkham.dto';
import { ThongTinLuotkham } from './thongtinluotkham.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ThongTinLuotkham])],
      resolvers: [
        {
          DTOClass: ThongTinLuotKhamDTO,
          EntityClass: ThongTinLuotkham,
          enableTotalCount: true,
          pagingStrategy: PagingStrategies.OFFSET,
          guards: [JwtAuthGuard],
        },
      ],
    }),
  ],
  providers: [],
})
export class ThongTinLuotKhamModule {}
