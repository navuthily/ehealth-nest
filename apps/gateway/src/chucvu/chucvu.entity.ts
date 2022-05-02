import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'DM_ChucVu' })
export class ChucvuEntity  {


  @PrimaryGeneratedColumn({ name: 'ID_ChucVu' })
  id: number;

  @Column({ name: 'TenChucVu' })
  tenchucvu?: string;
  

  @Column({ name: 'Active' })
  active?: number;

  @OneToMany(() => UserEntity, nhanvien => nhanvien.chucvu)
  nhanviens: UserEntity[]

}
