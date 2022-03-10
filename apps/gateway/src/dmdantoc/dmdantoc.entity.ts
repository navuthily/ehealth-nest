import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'DM_DanToc' })
export class DmdantocEntity  {


  @PrimaryColumn({ name: 'Id_DanToc' })
  id: number;

  @Column({ name: 'TenDanToc' })
  tendantoc?: string;
  


  @OneToMany(() => UserEntity, nhanvien => nhanvien.dmdantoc)
  nhanviens: UserEntity[]

}
