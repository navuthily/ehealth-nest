/* eslint-disable simple-import-sort/imports */
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { DmlabelEntity } from './dm-label.entity';
import { DmLabelDTO } from './dto/dm-label.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([DmlabelEntity])],
      // services: [Posph66EHService],
      resolvers: [
        {
          DTOClass: DmLabelDTO,
          EntityClass: DmlabelEntity,
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
export class DMLabelModule {}
