import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { SuatAnDTO } from './dto/suatan.dto';
import { SuatAnEntity } from './suatan.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([SuatAnEntity])],
      // services: [Posph66EHService],
      resolvers: [
        {
          DTOClass: SuatAnDTO,
          EntityClass: SuatAnEntity,
          pagingStrategy: PagingStrategies.OFFSET,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          // referenceBy: { key: 'luotkhamId' },
        },
        // {
        //   type: 'federated',
        //   DTOClass: ThongTinLuotKhamReferenceDTO,
        //   Service: Posph66EHService,
        // },
      ],
    }),
  ],
  providers: [],
})
export class SuatAnModule {}
