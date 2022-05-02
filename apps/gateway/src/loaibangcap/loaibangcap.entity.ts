import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { NhanvienbangcapEntity } from '../nhanvienbangcap/nhanvienbangcap.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'GD2_DM_LoaiBangCap' })
export class LoaibangcapEntity  {


  @PrimaryGeneratedColumn({ name: 'ID_LoaiBangCap' })
  id: number;

  @Column({ name: 'TenBangCap' })
  tenloaibangcap?: string;

  @OneToMany(() => NhanvienbangcapEntity, nhanvienbangcap => nhanvienbangcap.loaibangcap)
  nhanvienbangcaps:  NhanvienbangcapEntity[]

}
