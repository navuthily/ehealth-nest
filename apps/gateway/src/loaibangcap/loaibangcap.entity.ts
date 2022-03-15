import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { NhanvienbangcapEntity } from '../nhanvienbangcap/nhanvienbangcap.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'GD2_DM_LoaiBangCap' })
export class LoaibangcapEntity  {


  @PrimaryColumn({ name: 'ID_LoaiBangCap' })
  id: number;

  @Column({ name: 'TenBangCap' })
  tenloaibangcap?: string;

  @OneToMany(() => NhanvienbangcapEntity, nhanvienbangcap => nhanvienbangcap.loaibangcap)
  nhanvienbangcaps:  NhanvienbangcapEntity[]

}
