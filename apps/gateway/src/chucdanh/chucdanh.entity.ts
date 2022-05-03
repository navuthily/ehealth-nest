import { Column, Entity, OneToMany,  PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'DM_ChucDanh' })
export class ChucdanhEntity  {


  @PrimaryGeneratedColumn({ name: 'ID_ChucDanh' })
  id: number;

  @Column({ name: 'TenChucDanh' })
  tenchucdanh?: string;
  

  @OneToMany(() => UserEntity, nhanvien => nhanvien.chucdanh)
  nhanviens: UserEntity[]

}
