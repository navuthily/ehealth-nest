import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { DMVatTuDTO } from './dto/dmvt2.dto';
import { DMVatTuEntity } from './dmvt2.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([DMVatTuEntity])],
      // services: [Posph66EHService],
      resolvers: [
        {
          DTOClass: DMVatTuDTO,
          EntityClass: DMVatTuEntity,
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
export class DMVatTuModule {}
