import { Column, Entity, OneToMany, PrimaryColumn, ManyToOne, JoinColumn, PrimaryGeneratedColumn, BeforeUpdate, BeforeInsert } from 'typeorm';
import { LichSuChamDiemCap1 } from '../LichSuChamDiemCap1/lichsuchamdiemcap1.entity';
import { CauHinhToolCap3Entity } from '../cauhinhtoolcap3/cauhinhtoolcap3.entity';
import { Param } from '@nestjs/common';


@Entity({ name: 'Gd2_DA96_LichSuChamDiem_Cap2' })
export class LichSuChamDiemCap2Entity  {


  @PrimaryGeneratedColumn({ name: 'ID_AutoCap2' })
  id: number;


  @Column({ name: 'ID_AutoCap1' })
  ID_AutoCap1?: number;


  @Column({ name: 'ID_CauHinhCap3' })
  ID_CauHinhCap3?: number;


  @Column({ name: 'Value' })
  Value?: number;

  
  @Column({ name: 'Diem' })
  Diem?: number;


  @ManyToOne(() => LichSuChamDiemCap1, lichsuchamdiemcap1 => lichsuchamdiemcap1.lichsuchamdiemcap2s)
  @JoinColumn({ name: "ID_AutoCap1" })
  lichsuchamdiemcap1: LichSuChamDiemCap1


  @ManyToOne(() => CauHinhToolCap3Entity)
  @JoinColumn({ name: "ID_CauHinhCap3" })
  cauhinhtoolcap3: CauHinhToolCap3Entity






  


  // @OneToMany(() => UserEntity, nhanvien => nhanvien.dmdantoc)
  // nhanviens: UserEntity[]

}
