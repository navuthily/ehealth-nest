import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';

@Entity({ name: 'chucdanh' })
export class ChucdanhEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'ten_chuc_danh' })
  tenchucdanh?: string;

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

  @Column({ nullable: true, name: 'created_by' })
  createdBy?: number;

  @Column({ nullable: true, name: 'updated_by' })
  updatedBy?: number;

  @ManyToOne(() => UserEntity, (nhanvien) => nhanvien.nguoitaochucdanh)
  @JoinColumn({ name: 'created_by' })
  nguoitao: UserEntity;

  @ManyToOne(() => UserEntity, (nhanvien) => nhanvien.nguoisuachucdanh)
  @JoinColumn({ name: 'updated_by' })
  nguoisua: UserEntity;

  @OneToMany(() => UserEntity, (nhanvien) => nhanvien.chucdanh)
  nhanviens: UserEntity[];
}
