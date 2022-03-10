import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'GD2_DM_BoPhan' })
export class DmbophanEntity  {


  @PrimaryColumn({ name: 'Id_BoPhan' })
  id: number;

  @Column({ name: 'TenBoPhan' })
  tenbophan?: string;
  


  @OneToMany(() => UserEntity, nhanvien => nhanvien.dmbophan)
  nhanviens: UserEntity[]

}
