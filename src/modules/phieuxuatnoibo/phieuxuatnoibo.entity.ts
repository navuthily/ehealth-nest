// eslint-disable-next-line unicorn/filename-case
import { Type } from 'class-transformer';
import { AbstractUserEntity } from 'common/abstract-user.entity';
import { AbstractEntity } from 'common/abstract.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { v4 as uuid } from 'uuid';
import { PhieuXuatNoiBoDTO } from './dto/phieuxuatnoibo.dto';

import { AbstractUserDto } from 'common/dto/abstract-user.dto';
import { Inject } from '@nestjs/common';

@Entity('Gd2_PhieuXuatNoiBo')
export class PhieuXuatNoiBoEntity extends AbstractUserEntity {
  @PrimaryGeneratedColumn({ name: 'ID_PhieuXuatNoiBo' })
  phieuxuatnoiboId: number;

  @Column({ name: 'Id_NguoiTao' })
  idNguoiTao: number;

  @Column({ type: 'datetime2' })
  ngaygiotao: Date;

  @Column({ name: 'SoPhieu' })
  sophieu: number;

  @Column({ name: 'NguoiChot' })
  nguoichot?: number;

  @Column({ name: 'NgayChot' })
  ngaychot?: Date;
}
