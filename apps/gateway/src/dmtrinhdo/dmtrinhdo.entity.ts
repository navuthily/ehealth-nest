import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'DM_TrinhDo' })
export class DmtrinhdoEntity  {


  @PrimaryGeneratedColumn({ name: 'ID_TrinhDo' })
  id: number;

  @Column({ name: 'TenTrinhDo' })
  tentrinhdo?: string;
  


  @OneToMany(() => UserEntity, nhanvien => nhanvien.dmtrinhdo)
  nhanviens: UserEntity[]

}
