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
  @Column({nullable:true, name: 'noidung' })
  noidung?: string;
  @Column({nullable:true, name: 'loaitemplate' })
  loaitemplate?: string;
// thoi gian, nguoi tao update
  @Column({nullable:true, name: 'created_by' })
  createdBy?: number;
  @Column({ nullable:true,name: 'updated_by' })
  updatedBy?: number;
  @Column({nullable:true, name: 'created_at' })
  createdAt?: Date;
  @Column({ nullable:true,name: 'updated_at' })
  updatedAt?: Date;
  @ManyToOne(() => UserEntity, nhanvien=>  nhanvien.temps)
  @JoinColumn({ name: "created_by" })
  nguoitao: UserEntity;
  
  @ManyToOne(() => UserEntity, nhanvien=>  nhanvien.temp)
  @JoinColumn({ name: "updated_by" })
  nguoisua: UserEntity;
}
