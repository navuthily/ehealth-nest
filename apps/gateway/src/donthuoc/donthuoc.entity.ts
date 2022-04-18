import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { DonthuocchitietEntity } from '../donthuocchitiet/donthuocchitiet.entity';


@Entity({ name: 'DonThuoc' })
export class DonthuocEntity  {


  @PrimaryGeneratedColumn({ name: 'ID_DonThuoc' })
  id: number;

  @Column({ name: 'ID_LuotKham' })
  id_luotkham?: number;
  

  @Column({ name: 'ID_Kham' })
  id_kham?: number;

  
  @Column({ name: 'ID_BenhNhan' })
  id_benhnhan?: number;

  
  @Column({ name: 'ID_BacSiChoToa' })
  id_bacsichotoa?: number;

  
  @Column({ name: 'GhiChu' })
  ghichu?: number;

  
  @Column({ name: 'DaThanhToan' })
  dathanhtoan?: number;

  
  @Column({ name: 'ID_DonThuoc_Cu' })
  id_donthuoccu?: number;



  @OneToMany(() => DonthuocchitietEntity, donthuocchitiet => donthuocchitiet.donthuoc)
  donthuocchitiets: DonthuocchitietEntity[]

}
