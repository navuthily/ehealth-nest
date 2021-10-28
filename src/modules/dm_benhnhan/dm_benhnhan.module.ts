/* eslint-disable simple-import-sort/imports */
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
// import { CreateDisciplineInput } from './dto/create-discipline.input';
import { DMBenhNhanDTO } from './dto/dm_benhnhan.dto';
// import { UpdateDisciplineInput } from './dto/update-discipline.input';
import { DMBenhNhan } from './dm_benhnhan.entity';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([DMBenhNhan])],
      resolvers: [
        {
          DTOClass: DMBenhNhanDTO,
          EntityClass: DMBenhNhan,
          //   CreateDTOClass: CreateDisciplineInput,
          //   UpdateDTOClass: UpdateDisciplineInput,
          enableTotalCount: true,
          pagingStrategy: PagingStrategies.OFFSET,
          guards: [JwtAuthGuard],
        },
      ],
    }),
  ],
  providers: [],
})
export class DMBenhNhanModule {}
