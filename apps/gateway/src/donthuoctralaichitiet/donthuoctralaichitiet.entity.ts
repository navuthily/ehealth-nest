import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { DonthuocchitietEntity } from '../donthuocchitiet/donthuocchitiet.entity';
import { DonthuoctralaiEntity } from '../donthuoctralai/donthuoctralai.entity';
import { DMThuocEntity } from '../thuoc/thuoc.entity';


@Entity({ name: 'GD2_DonThuocTraLaiChiTiet' })
export class DonthuoctralaichitietEntity  {


  @PrimaryGeneratedColumn({ name: 'ID_DonThuocTraLaiChiTiet' })
  id: number;

  @Column({ name: 'ID_DonThuocTraLai' })
  id_donthuoctralai?: number;
  
  @Column({ name: 'ID_donThuoc' })
  id_donthuoc?: number;

  @Column({ name: 'ID_Thuoc' })
  id_thuoc?: number;

  @Column({ name: 'SoLuongTraLai' })
  soluongtralai?: number;
  
  @ManyToOne(() => DonthuoctralaiEntity, donthuoctralai => donthuoctralai.donthuoctralaichitiets)
  @JoinColumn({ name: "id_donthuoctralai" })
  donthuoctralai: DonthuoctralaiEntity


  @ManyToOne(() => DMThuocEntity, dmthuoc => dmthuoc.donthuoctralaichitiets)
  @JoinColumn({ name: "id_thuoc" })
  dmthuoc: DMThuocEntity
  

  

  // @OneToMany(() => DonthuocchitietEntity, donthuocchitiet => donthuocchitiet.dmthuoc)
  // donthuocchitiets: DonthuocchitietEntity[]

}
