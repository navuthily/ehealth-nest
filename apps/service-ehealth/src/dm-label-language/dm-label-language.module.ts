/* eslint-disable simple-import-sort/imports */
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { DmLabelLanguageEntity } from './dm-label-language.entity';
import { DmLabelLanguageDTO } from './dto/dm-label-language.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([DmLabelLanguageEntity])],
      // services: [Posph66EHService],
      resolvers: [
        {
          DTOClass: DmLabelLanguageDTO,
          EntityClass: DmLabelLanguageEntity,
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
export class DMLabelLanguageModule {}
