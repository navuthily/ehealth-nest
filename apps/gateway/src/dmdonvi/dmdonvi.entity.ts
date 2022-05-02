import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'GD2_DM_DonVi' })
export class DmdonviEntity  {


  @PrimaryGeneratedColumn({ name: 'Id_DonVi' })
  id: number;

  @Column({ name: 'TenDonVi' })
  tendonvi?: string;
  


  @OneToMany(() => UserEntity, nhanvien => nhanvien.dmdonvi)
  nhanviens: UserEntity[]

}
