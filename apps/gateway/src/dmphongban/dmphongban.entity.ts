import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'PhongBan' })
export class DmphongbanEntity  {


  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'ten_phong_ban' })
  tenphongban?: string;
  
  
  @Column({nullable:true, name: 'created_at' })
  createdAt?: Date;
  
  @Column({ nullable:true,name: 'updated_at' })
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

  @OneToMany(() => UserEntity, nhanvien => nhanvien.dmphongban)
  nhanviens: UserEntity[]

}
