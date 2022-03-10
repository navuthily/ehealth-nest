import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'DM_TrinhDo' })
export class DmtrinhdoEntity  {


  @PrimaryColumn({ name: 'ID_TrinhDo' })
  id: number;

  @Column({ name: 'TenTrinhDo' })
  tentrinhdo?: string;
  


  @OneToMany(() => UserEntity, nhanvien => nhanvien.dmtrinhdo)
  nhanviens: UserEntity[]

}
