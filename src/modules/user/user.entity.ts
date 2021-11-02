import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators/use-dto.decorator';
import type { UserDtoOptions } from './dto/user-dto';
import { UserDto } from './dto/user-dto';

@Entity({ name: 'DM_NhanVien' })
@UseDto(UserDto)
export class UserEntity extends AbstractEntity<UserDto, UserDtoOptions> {
  @PrimaryGeneratedColumn({ name: 'ID_NhanVien' })
  id?: string;

  //   @Column({ nullable: true })
  //   lastName?: string;

  //   @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  //   role: RoleType;

  @Column({ unique: true, nullable: true, name: 'UserName' })
  email?: string;

  @Exclude()
  @Column({ nullable: true, name: 'PassWord' })
  password?: string;

  @Column({ nullable: true, name: 'TenNhanVien' })
  tenNhanVien: string;

  //   @Column({ nullable: true })
  //   phone?: string;

  //   @Column({ nullable: true })
  //   avatar?: string;

  //   @VirtualColumn()
  //   fullName?: string;
}
