import type { FindConditions } from 'typeorm';

import type { PageDto } from '@libs/common/dto/page.dto';
import { FileNotImageException } from '@libs/exceptions/file-not-image.exception';
import { UserNotFoundException } from '@libs/exceptions/user-not-found.exception';
import type { IFile } from '@libs/interfaces';
import { AwsS3Service } from '@libs/shared/services/aws-s3.service';
import { ValidatorService } from '@libs/shared/services/validator.service';
import type { Optional } from '@libs/types';
import type { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import { UserDto } from './dto/user-dto';
import type { UsersPageOptionsDto } from './dto/users-page-options.dto';
import type { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import ses = require('node-ses');

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(
    public readonly userRepository: UserRepository,
    public readonly validatorService: ValidatorService,
    public readonly awsS3Service: AwsS3Service,
    @InjectRepository(UserRepository) repo,
  ) {
    super(repo);
  }
  async reigisterUser(
    userRegisterDto: UserRegisterDto,
    // file: IFile,
  ): Promise<UserEntity> {
    const usercheck = await this.userRepository.findOne({
      email: userRegisterDto.email,
    });
    if (usercheck) throw new BadRequestException('user ready exist');
    const user = this.userRepository.create(userRegisterDto);

    // if (file && !this.validatorService.isImage(file.mimetype)) {
    //   throw new FileNotImageException();
    // }

    return this.userRepository.save(user);
  }

  async createUser(
    userDto: UserDto,
    // file: IFile,
  ): Promise<UserEntity> {
    const usercheckEmail = await this.userRepository.findOne({
      email: userDto.email,
    });
    if (usercheckEmail)
      throw new BadRequestException(
        `user with email ${userDto.email} ready exist`,
      );
    const randomstring = Math.random().toString(36).slice(-8);
    userDto.password = randomstring;
    const user = this.userRepository.create(userDto);

    // if (file && !this.validatorService.isImage(file.mimetype)) {
    //   throw new FileNotImageException();
    // }
    const client = ses.createClient({
      key: process.env.KEY_SES || '',
      secret: process.env.SECRET_SES || '',
    });
    client.sendEmail(
      {
        to: userDto.email,
        from: 'testing@nana21.online',
        subject: 'Thông tin tài khoản sử dụng hệ thống Ehealth Family',
        message: `<b>Xin chào ${userDto.holotNhanVien} ${userDto.tennhanvien},</b><br/> Tài khoản đăng nhập vào hệ thống Ehealth Family của bạn là: <br/> Email:
          ${userDto.email} - password: ${userDto.password}`,
        altText: 'plain text',
      },
      function (err, data, res) {
        console.log(data, 'aaaa');
      },
    );
    return this.userRepository.save(user);
  }
  async getUser(userId: number): Promise<UserDto> {
    const queryBuilder = this.userRepository.createQueryBuilder('dm_nhanvien');

    queryBuilder.where('dm_nhanvien.id_nhanvien = :userId', { userId });

    const userEntity = await queryBuilder.getOne();

    if (!userEntity) {
      throw new UserNotFoundException();
    }

    return userEntity.toDto();
  }

  getAllNhanVien() {
    return this.repo.find();
  }
}
