import { AbstractEntity } from '@libs/common/abstract.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne,PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TemplatehdDTO } from './dto/templatehd-dto';
import type { TemplatehdDtoOptions } from  './dto/templatehd-dto';
import { UseDto } from '@libs/decorators/use-dto.decorator';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'MauHopDong' })
  export class TemplateHdEntity {

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;
  @Column({nullable:true, name: 'noi_dung' })
  noidung?: string;
  @Column({nullable:true, name: 'ten_mau_hop_dong' })
  loaitemplate?: string;

@CreateDateColumn({
  nullable: true,
  name: 'created_at',
})
createdAt?: Date;

@UpdateDateColumn({
  nullable: true,
  name: 'updated_at',
})
updatedAt?: Date;

  @Column({nullable:true, name: 'created_by' })
  createdBy?: number;
  @Column({ nullable:true,name: 'updated_by' })
  updatedBy?: number;
  @ManyToOne(() => UserEntity, nhanvien=>  nhanvien.temps)
  @JoinColumn({ name: "created_by" })
  nguoitao: UserEntity;
  
  @ManyToOne(() => UserEntity, nhanvien=>  nhanvien.temp)
  @JoinColumn({ name: "updated_by" })
  nguoisua: UserEntity;
}
