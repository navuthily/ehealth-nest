import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'GD2_DM_HopDong' })
export class DmhopdongEntity  {


  @PrimaryGeneratedColumn({ name: 'Id_HopDong' })
  id: number;

  @Column({ name: 'TenHopDong' })
  tenhopdong?: string;
  


  @OneToMany(() => UserEntity, nhanvien => nhanvien.dmhopdong)
  nhanviens: UserEntity[]

}
