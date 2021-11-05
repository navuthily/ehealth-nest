import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDto } from './dto/user-dto';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

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
          //   pagingStrategy: PagingStrategies.OFFSET,
          guards: [JwtAuthGuard],
        },
      ],
    }),
  ],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}
