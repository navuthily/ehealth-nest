import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDto } from './dto/user-dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { TranslationService } from '@libs/shared/services/translation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([UserEntity])],
      resolvers: [
        {
          DTOClass: UserDto,
          EntityClass: UserEntity,
          enableTotalCount: true,
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
        },
      ],
    }),
  ],
  controllers: [UserController],
  exports: [UserService, TranslationService],
  providers: [UserService, TranslationService],
})
export class UserModule {}
