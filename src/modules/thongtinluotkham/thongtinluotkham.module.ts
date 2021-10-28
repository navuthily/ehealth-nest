/* eslint-disable simple-import-sort/imports */
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
// import { CreateDisciplineInput } from './dto/create-discipline.input';
import { ThongTinLuotKhamDTO } from './dto/thongtinluotkham.dto';
// import { UpdateDisciplineInput } from './dto/update-discipline.input';
import { ThongTinLuotkham } from './thongtinluotkham.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ThongTinLuotkham])],
      resolvers: [
        {
          DTOClass: ThongTinLuotKhamDTO,
          EntityClass: ThongTinLuotkham,
          //   CreateDTOClass: CreateDisciplineInput,
          //   UpdateDTOClass: UpdateDisciplineInput,
          enableTotalCount: true,
          pagingStrategy: PagingStrategies.OFFSET,
        },
      ],
    }),
  ],
  providers: [],
})
export class ThongTinLuotKhamModule {}
