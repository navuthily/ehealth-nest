import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { DonthuocchitietEntity } from '../donthuocchitiet/donthuocchitiet.entity';
import { DonthuoctralaichitietEntity } from '../donthuoctralaichitiet/donthuoctralaichitiet.entity';


@Entity({ name: 'GD2_DonThuocTraLai' })
export class DonthuoctralaiEntity  {


  @PrimaryGeneratedColumn({ name: 'ID_DonThuocTraLai' })
  id: number;

  @Column({ name: 'ID_LuotKham' })
  id_luotkham?: number;
  




  @OneToMany(() => DonthuoctralaichitietEntity, donthuoctralaichitiet => donthuoctralaichitiet.donthuoctralai)
  donthuoctralaichitiets: DonthuoctralaichitietEntity[]

}
