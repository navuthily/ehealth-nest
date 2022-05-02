import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'DM_PhongBan' })
export class DmphongbanEntity  {


  @PrimaryGeneratedColumn({ name: 'Id_PhongBan' })
  id: number;

  @Column({ name: 'TenPhongBan' })
  tenphongban?: string;
  


  @OneToMany(() => UserEntity, nhanvien => nhanvien.dmphongban)
  nhanviens: UserEntity[]

}
