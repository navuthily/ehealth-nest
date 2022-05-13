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
import { DmphongbanEntity } from '../dmphongban/dmphongban.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'BoPhan' })
export class DmbophanEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'ten_bo_phan' })
  tenbophan?: string;

  @Column({ name: 'phong_ban_id' })
  phongbanId: number;

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

  @ManyToOne(() => UserEntity, (nhanvien) => nhanvien.nguoitaobophan)
  @JoinColumn({ name: 'created_by' })
  nguoitao: UserEntity;

  @ManyToOne(() => UserEntity, (nhanvien) => nhanvien.nguoisuabophan)
  @JoinColumn({ name: 'updated_by' })
  nguoisua: UserEntity;

  @OneToMany(() => UserEntity, (nhanvien) => nhanvien.dmbophan)
  nhanviens: UserEntity[];
  
  @ManyToOne(() => DmphongbanEntity, (pb) => pb.bophans)
  @JoinColumn({ name: 'phong_ban_id' })
  phongban: DmphongbanEntity;
}
