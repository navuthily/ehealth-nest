import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { ModuleThanhVienDTO } from './dto/moduleThanhVien.dto';
import { ModuleThanhVienEntity } from './moduleThanhVien.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ModuleThanhVienEntity])],
      resolvers: [
        {
          DTOClass: ModuleThanhVienDTO,
          EntityClass: ModuleThanhVienEntity,
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
export class ModuleThanhVienModule {}
