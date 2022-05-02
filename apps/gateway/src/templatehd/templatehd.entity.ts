import { AbstractEntity } from '@libs/common/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne,PrimaryGeneratedColumn } from 'typeorm';
import { TemplatehdDTO } from './dto/templatehd-dto';
import type { TemplatehdDtoOptions } from  './dto/templatehd-dto';
import { UseDto } from '@libs/decorators/use-dto.decorator';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'TemplateHd' })
  export class TemplateHdEntity {

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;
  @Column({ name: 'noidung' })
  noidung?: string;
  @Column({ name: 'loaitemplate' })
  loaitemplate?: string;
// thoi gian, nguoi tao update
  @Column({ name: 'created_by' })
  createdBy?: number;
  @Column({ name: 'updated_by' })
  updatedBy?: number;
  @Column({ name: 'created_at' })
  createdAt?: Date;
  @Column({ name: 'updated_at' })
  updatedAt?: Date;
  @ManyToOne(() => UserEntity, nhanvien=>  nhanvien.temps)
  @JoinColumn({ name: "created_by" })
  nguoitao: UserEntity;
  
  @ManyToOne(() => UserEntity, nhanvien=>  nhanvien.temp)
  @JoinColumn({ name: "updated_by" })
  nguoisua: UserEntity;
}
