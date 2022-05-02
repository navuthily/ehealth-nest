import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'GD2_ChuyenKhoa' })
export class ChuyenkhoaEntity  {


  @PrimaryGeneratedColumn({ name: 'ID_ChuyenKhoa' })
  id: number;

  @Column({ name: 'TenChuyenKhoa' })
  tenchuyenkhoa?: string;
  

  @OneToMany(() => UserEntity, nhanvien => nhanvien.chuyenkhoa)
  nhanviens: UserEntity[]

}
