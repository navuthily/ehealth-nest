import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { LoaibangcapEntity } from '../loaibangcap/loaibangcap.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'GD2_NhanVien_BangCap' })
export class NhanvienbangcapEntity  {


  @PrimaryColumn({ name: 'ID_auto' })
  id: number;

  @Column({ name: 'ID_NhanVien' })
  idnhanvien: number;
  @Column({ name: 'ID_LoaiBangCap' })
  idloaibangcap: number;
  
  @ManyToOne(() => UserEntity, nhanvien => nhanvien.nhanvienbangcaps)
  @JoinColumn({ name: "ID_NhanVien" })
  nhanvien:UserEntity

  @ManyToOne(() => LoaibangcapEntity, loaibangcap => loaibangcap.nhanvienbangcaps)
  @JoinColumn({ name: "ID_LoaiBangCap" })
  loaibangcap:LoaibangcapEntity
}
