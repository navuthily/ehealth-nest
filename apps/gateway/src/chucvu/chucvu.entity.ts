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

@Entity({ name: 'ChucVu' })
export class ChucvuEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'ten_chuc_vu' })
  tenchucvu?: string;

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

  @ManyToOne(() => UserEntity, (nhanvien) => nhanvien.nguoitaochucvu)
  @JoinColumn({ name: 'created_by' })
  nguoitao: UserEntity;

  @ManyToOne(() => UserEntity, (nhanvien) => nhanvien.nguoisuachucvu)
  @JoinColumn({ name: 'updated_by' })
  nguoisua: UserEntity;

  @OneToMany(() => UserEntity, (nhanvien) => nhanvien.chucvu)
  nhanviens: UserEntity[];
}
