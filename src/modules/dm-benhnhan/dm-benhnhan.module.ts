/* eslint-disable simple-import-sort/imports */
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
// import { CreateDisciplineInput } from './dto/create-discipline.input';
import { DMBenhNhanDTO } from './dto/dm-benhnhan.dto';
// import { UpdateDisciplineInput } from './dto/update-discipline.input';
import { DMBenhNhanEntity } from './dm-benhnhan.entity';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';
import { DMBenhNhanService } from './dm-benhnhan.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([DMBenhNhanEntity])],
      services: [DMBenhNhanService],
      resolvers: [
        {
          DTOClass: DMBenhNhanDTO,
          EntityClass: DMBenhNhanEntity,
          ServiceClass: DMBenhNhanService,
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
