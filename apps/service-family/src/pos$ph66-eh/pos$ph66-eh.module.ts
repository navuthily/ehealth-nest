/* eslint-disable simple-import-sort/imports */
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { Posph66EhHDTO } from './dto/pos$ph66-eh.dto';
import { Posph66EhEntity } from './pos$ph66-eh.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        // NestjsQueryTypeOrmModule.forFeature([Posph66EhEntity], 'db_FAMILY_WRK'),
        NestjsQueryTypeOrmModule.forFeature([Posph66EhEntity]),
      ], // Nếu không truyền tên database thì sẽ lấy db mặc định
      resolvers: [
        {
          DTOClass: Posph66EhHDTO,
          EntityClass: Posph66EhEntity,
          referenceBy: {key: 'luotkhamId'}
        },
      ],
    }),
  ],
  providers: [],
})
export class Posph66EhModule {}
