
import {
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity('Pos$ph66_EH')
export class Posph66EhEntity {
  @PrimaryColumn({ name: 'Id_Phieu' })
  id: number;

  @Column()
  ngay_ct: Date;

  @Column({ name: 'Id_LuotKham' })
  luotkhamId: number;
}
