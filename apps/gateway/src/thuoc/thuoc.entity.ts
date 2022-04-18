import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { DonthuocchitietEntity } from '../donthuocchitiet/donthuocchitiet.entity';
import { DonthuoctralaichitietEntity } from '../donthuoctralaichitiet/donthuoctralaichitiet.entity';


@Entity({ name: 'dm_thuoc' })
export class DMThuocEntity  {


  @PrimaryGeneratedColumn({ name: 'ID_Thuoc' })
  id: number;

  @Column({ name: 'LaThuoc' })
  lathuoc?: number;
  




  @OneToMany(() => DonthuocchitietEntity, donthuocchitiet => donthuocchitiet.dmthuoc)
  donthuocchitiets: DonthuocchitietEntity[]

  @OneToMany(() => DonthuoctralaichitietEntity, donthuoctralaichitiet => donthuoctralaichitiet.dmthuoc)
  donthuoctralaichitiets: DonthuoctralaichitietEntity[]


}
