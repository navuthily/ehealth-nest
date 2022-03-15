import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'DM_ChucVu' })
export class ChucvuEntity  {


  @PrimaryColumn({ name: 'ID_ChucVu' })
  id: number;

  @Column({ name: 'TenChucVu' })
  tenchucvu?: string;
  

  @Column({ name: 'Active' })
  active?: number;

  @OneToMany(() => UserEntity, nhanvien => nhanvien.chucvu)
  nhanviens: UserEntity[]

}
