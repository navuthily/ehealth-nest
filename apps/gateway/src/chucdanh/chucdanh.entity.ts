import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'DM_ChucDanh' })
export class ChucdanhEntity  {


  @PrimaryColumn({ name: 'ID_ChucDanh' })
  id: number;

  @Column({ name: 'TenChucDanh' })
  tenchucdanh?: string;
  

  @Column({ name: 'Active' })
  active?: number;

  @OneToMany(() => UserEntity, nhanvien => nhanvien.chucdanh)
  nhanviens: UserEntity[]

}
