import { Column, Entity, OneToMany, PrimaryColumn, ManyToOne, JoinColumn, OneToOne, AfterLoad, getRepository, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CauHinhToolCap1Entity } from '../cauhinhtoolcap1/cauhinhtoolcap1.entity';
import { DinhNghiaLoaiCongThucEntity } from '../dinhnghialoaicongthuc/dinhnghialoaicongthuc.entity';
import { LichSuChamDiemCap2Entity } from '../lichsuchamdiemcap2/lichsuchamdiemcap2.entity';

@Entity({ name: 'Gd2_DA96_LichSuChamDiem_Cap1' })
export class LichSuChamDiemCap1  {


  @PrimaryGeneratedColumn({ name: 'Id_AutoCap1' })
  id: number;


  @Column({ name: 'ID_BsCham' })
  ID_BsCham?: number;

  @Column({ name: 'NgayGioCham' })
  NgayGioCham?: Date;

  @Column({ name: 'ID_BenhNhan' })
  ID_BenhNhan?: number;

  @Column({ name: 'ID_LuotKham' })
  ID_LuotKham?: number;

  @Column({ name: 'ID_Tool' })
  ID_Tool?: string;

  @Column({ name: 'TongDiem' })
  TongDiem?: number;

  @Column({ name: 'KetQua' })
  KetQua?: string;


  @ManyToOne(() => DinhNghiaLoaiCongThucEntity, dinhnghialoaicongthuc => dinhnghialoaicongthuc.lichsuchamdiemcap1s)
  @JoinColumn({ name: "ID_Tool" })
  dinhnghialoaicongthuc: DinhNghiaLoaiCongThucEntity

  @ManyToOne(() => UserEntity, nhanvien => nhanvien.lichsuchamdiemcap1s)
  @JoinColumn({ name: "ID_BsCham" })
  nhanvien: UserEntity


  @ManyToOne(() => CauHinhToolCap1Entity, cauhinhtoolcap1 => cauhinhtoolcap1.lichsuchamdiemcap1s)
  @JoinColumn({ name: "ID_Tool"})
  cauhinhtoolcap1: CauHinhToolCap1Entity

  
  @OneToMany(() => LichSuChamDiemCap2Entity, lichsuchamdiemcap2 => lichsuchamdiemcap2.lichsuchamdiemcap1)
  lichsuchamdiemcap2s: LichSuChamDiemCap2Entity[]







  // dinhnghialoaicongthuc: DinhNghiaLoaiCongThucEntity;
  // @AfterLoad()
  // async afterLoad(){
  //   this.dinhnghialoaicongthuc  = await getRepository(DinhNghiaLoaiCongThucEntity).findOneOrFail(this.ID_Tool)
  //   delete this.ID_Tool
  // }

}
