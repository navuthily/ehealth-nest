import { Column, Entity, OneToMany, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { LichSuChamDiemCap1 } from '../LichSuChamDiemCap1/lichsuchamdiemcap1.entity';


@Entity({ name: 'Gd2_DA96_LichSuChamDiem_Cap2' })
export class LichSuChamDiemCap2Entity  {


  @PrimaryColumn({ name: 'ID_AutoCap2' })
  ID_AutoCap2: number;


  @Column({ name: 'ID_AutoCap1' })
  ID_AutoCap1?: number;


  @ManyToOne(() => LichSuChamDiemCap1, lichsuchamdiemcap1 => lichsuchamdiemcap1.lichsuchamdiemcap2s)
  @JoinColumn({ name: "ID_AutoCap1" })
  lichsuchamdiemcap1: LichSuChamDiemCap1







  


  // @OneToMany(() => UserEntity, nhanvien => nhanvien.dmdantoc)
  // nhanviens: UserEntity[]

}
