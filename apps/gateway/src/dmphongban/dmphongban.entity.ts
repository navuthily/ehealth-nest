import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { DmbophanEntity } from '../dmbophan/dmbophan.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'PhongBan' })
export class DmphongbanEntity  {

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'ten_phong_ban' })
  tenphongban?: string;
  
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

  @ManyToOne(() => UserEntity, (nhanvien) => nhanvien.nguoitaophongban)
  @JoinColumn({ name: 'created_by' })
  nguoitao: UserEntity;

  @ManyToOne(() => UserEntity, (nhanvien) => nhanvien.nguoisuaphongban)
  @JoinColumn({ name: 'updated_by' })
  nguoisua: UserEntity;

  @OneToMany(() => DmbophanEntity, bophan => bophan.phongban)
  bophans: DmbophanEntity[]
  
}
