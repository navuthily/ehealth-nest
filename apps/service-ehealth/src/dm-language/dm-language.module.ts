/* eslint-disable simple-import-sort/imports */
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { DmLanguageEntity } from './dm-language.entity';
import { DmLanguageDTO } from './dto/dm-language.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([DmLanguageEntity])],
      // services: [Posph66EHService],
      resolvers: [
        {
          DTOClass: DmLanguageDTO,
          EntityClass: DmLanguageEntity,
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
export class DMLanguageModule {}
