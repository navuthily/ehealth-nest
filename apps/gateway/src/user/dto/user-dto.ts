import {
  BeforeCreateOne,
  BeforeUpdateOne,
  CreateOneInputType,
  FilterableField,
  PagingStrategies,
  QueryOptions,
  UpdateOneInputType,
} from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractUserInput } from '@libs/common/dto/abstract-user.input';
import { UserContext } from '../../auth/auth.interfaces';

import { AbstractDto } from '@libs/common/dto/abstract.dto';
import type { UserEntity } from '../user.entity';

export type UserDtoOptions = Partial<{ isActive: boolean }>;

@ObjectType('User')
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  maxResultsSize: 1000000,
  defaultResultSize: 1000000,
  enableTotalCount: false,
})
export class UserDto extends AbstractDto {
  @FilterableField({ nullable: true })
  tennhanvien?: string;

  @FilterableField({ nullable: true })
  holotNhanVien?: string;

  @FilterableField({ nullable: true })
  nickname?: string;

  @FilterableField({ nullable: true })
  mobile?: string;

  @FilterableField({ nullable: true })
  hinhNhanVien?: string;

  @FilterableField({ nullable: true })
  gioitinh?: boolean;

  @FilterableField({ nullable: true })
  quoctich?: string;

  @FilterableField({ nullable: true })
  cmnd?: string;

  @FilterableField({ nullable: true })
  ngaycapCMND?: Date;

  @FilterableField({ nullable: true })
  noicapCMND?: string;

  @FilterableField({ nullable: true })
  hochieu?: string;

  @FilterableField({ nullable: true })
  diachi?: string;

  @FilterableField({ nullable: true })
  email: string;

  @FilterableField({ nullable: true })
  ngaysinh?: Date;

  @FilterableField({ nullable: true })
  ngayvaolam?: Date;

  @FilterableField({ nullable: true })
  ngaynghiviec?: Date;

  @FilterableField({ nullable: true })
  masothuecanhan?: string;

  @FilterableField({ nullable: true })
  sobaohiem?: string;

  @FilterableField({ nullable: true })
  hinhchuky?: string;

  @FilterableField({ nullable: true })
  allowLogin?: boolean;

  @FilterableField({ nullable: true })
  password: string;

  @FilterableField({ nullable: true })
  role: string;

  @FilterableField({ nullable: true })
  trinhdoId?: number;

  @FilterableField({ nullable: true })
  donviId?: number;

  @FilterableField({ nullable: true })
  bophanId?: number;

  @FilterableField({ nullable: true })
  phongbanId?: number;

  @FilterableField({ nullable: true })
  chucvuId?: number;

  @FilterableField({ nullable: true })
  chucdanhId?: number;

  @FilterableField({ nullable: true })
  loaitinhluongId?: number;

  @FilterableField({ nullable: true })
  chuyenkhoaId?: number;

  @FilterableField({ nullable: true })
  loaikhoiId?: number;

  @FilterableField({ nullable: true })
  createdBy?: number;

  @FilterableField({ nullable: true })
  updatedBy?: number;

  // Sử dụng khi gọi .toDto()
  constructor(user: UserEntity) {
    super(user);
    this.nickname = user?.nickname;
    this.holotNhanVien = user?.holotNhanVien;
    this.tennhanvien = user?.tennhanvien;
    this.phongbanId = user?.phongbanId;
    // this.isActive = options?.isActive;
  }
}
