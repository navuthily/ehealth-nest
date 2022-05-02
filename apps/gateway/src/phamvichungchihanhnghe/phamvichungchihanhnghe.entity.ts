import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'GD2_DM_PhamViChungChiHanhNghe' })
export class PhamvichungchihanhngheEntity  {


  @PrimaryGeneratedColumn({ name: 'ID_PhamViChungChiHanhNghe' })
  id: number;

  @Column({ name: 'PhamViChungChiHanhNghe' })
  tenphamvichungchihanhnghe?: string;
  
  @OneToMany(() => UserEntity, nhanvien => nhanvien.phamvichungchihanhnghe)
  nhanviens: UserEntity[]

  @OneToMany(() => UserEntity, nhanvien => nhanvien.phamvihanhnghebosung)
  nhanvien2s: UserEntity[]
  
}
