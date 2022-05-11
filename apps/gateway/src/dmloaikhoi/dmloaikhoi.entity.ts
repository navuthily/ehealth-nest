import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'LoaiKhoi' })
export class DmloaikhoiEntity  {


  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'ten_loai_khoi' })
  tenloaikhoi?: string;
    
  @Column({nullable:true, name: 'created_at' })
  createdAt?: Date;
  
  @Column({ nullable:true,name: 'updated_at' })
  updatedAt?: Date;

  @Column({ nullable: true, name: 'created_by' })
  createdBy?: number;

  @Column({ nullable: true, name: 'updated_by' })
  updatedBy?: number;

  @ManyToOne(() => UserEntity, (nhanvien) => nhanvien.nguoitaoloaikhoi)
  @JoinColumn({ name: 'created_by' })
  nguoitao: UserEntity;

  @ManyToOne(() => UserEntity, (nhanvien) => nhanvien.nguoisualoaikhoi)
  @JoinColumn({ name: 'updated_by' })
  nguoisua: UserEntity;

  @OneToMany(() => UserEntity, nhanvien => nhanvien.dmloaikhoi)
  nhanviens: UserEntity[]

}
