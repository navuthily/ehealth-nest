/* eslint-disable simple-import-sort/imports */
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
// import { CreateDisciplineInput } from './dto/create-discipline.input';
import { PhieuXuatNoiBoDTO } from './dto/phieuxuatnoibo.dto';
// import { UpdateDisciplineInput } from './dto/update-discipline.input';
import { PhieuXuatNoiBoEntity } from './phieuxuatnoibo.entity';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';
import { PhieuXuatNoiBoResolver } from './phieuxuatnoibo.resolver';
import { PhieuXuatNoiBoInputDTO } from './dto/phieuxuatnoibo-input.dto';
import { PhieuXuatNoiBoUpdateDTO } from './dto/phieuxuatnoibo-update.dto';
import { PhieuXuatNoiBoService } from './phieuxuatnoibo.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([PhieuXuatNoiBoEntity])],
      // Sử dụng khi muốn custom lại các method có sẵn
      //   dtos: [
      //     {
      //       DTOClass: PhieuXuatNoiBoDTO,
      //       CreateDTOClass: PhieuXuatNoiBoInputDTO,
      //       UpdateDTOClass: PhieuXuatNoiBoUpdateDTO,
      //     },
      //   ],
      // Tạo ra các method có sẵn
      services: [PhieuXuatNoiBoService],
      resolvers: [
        {
          DTOClass: PhieuXuatNoiBoDTO,
          EntityClass: PhieuXuatNoiBoEntity,
          ServiceClass: PhieuXuatNoiBoService,
          CreateDTOClass: PhieuXuatNoiBoInputDTO,
          UpdateDTOClass: PhieuXuatNoiBoUpdateDTO,

          enableTotalCount: true,
          pagingStrategy: PagingStrategies.OFFSET,
          guards: [JwtAuthGuard],
        },
      ],
    }),
  ],
  // Muốn custom theo chuẩn
  //   providers: [PhieuXuatNoiBoResolver, PhieuXuatNoiBoService],
  //   exports: [PhieuXuatNoiBoService],
  providers: [PhieuXuatNoiBoResolver],
  //
})
export class PhieuXuatNoiBoModule {}
