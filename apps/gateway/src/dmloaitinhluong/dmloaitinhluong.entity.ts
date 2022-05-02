import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'DM_LoaiTinhLuong' })
export class DmloaitinhluongEntity  {


  @PrimaryGeneratedColumn({ name: 'ID_LoaiTinhLuong' })
  id: number;

  @Column({ name: 'TenLoaiTinhLuong' })
  tenloaitinhluong?: string;
  


  @OneToMany(() => UserEntity, nhanvien => nhanvien.dmloaitinhluong)
  nhanviens: UserEntity[]

}
