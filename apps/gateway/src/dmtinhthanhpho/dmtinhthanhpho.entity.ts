import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'DM_TinhThanhPho' })
export class DmtinhthanhphoEntity  {


  @PrimaryGeneratedColumn({ name: 'ID_ThanhPho' })
  id: number;

  @Column({ name: 'TenTinhThanhPho' })
  tentinhthanhpho?: string;
  

  @OneToMany(() => UserEntity, nhanvien => nhanvien.nccmnd)
  nhanviens: UserEntity[]
  @OneToMany(() => UserEntity, nhanvien => nhanvien.nccchn)
  nhanviens2: UserEntity[]
}
