import {
    NestjsQueryGraphQLModule,
    PagingStrategies,
  } from '@nestjs-query/query-graphql';
  import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
  import { Module } from '@nestjs/common';
  import { SuatAnChiTietDTO } from './dto/suatanchitiet.dto';
  import { SuatAnChiTietEntity } from './suatanchitiet.entity';
  
  @Module({
    imports: [
      NestjsQueryGraphQLModule.forFeature({
        imports: [NestjsQueryTypeOrmModule.forFeature([SuatAnChiTietEntity])],
        resolvers: [
          {
            DTOClass: SuatAnChiTietDTO,
            EntityClass: SuatAnChiTietEntity,
            pagingStrategy: PagingStrategies.OFFSET,
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
  export class SuatAnChiTietModule {}
  