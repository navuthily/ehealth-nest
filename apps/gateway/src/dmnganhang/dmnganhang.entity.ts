import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'DM_NganHang' })
export class DmnganhangEntity  {


  @PrimaryGeneratedColumn({ name: 'ID_NganHang' })
  id: number;

  @Column({ name: 'TenNganHang' })
  tennganhang?: string;
  


  @OneToMany(() => UserEntity, nhanvien => nhanvien.dmnganhang)
  nhanviens: UserEntity[]

}
