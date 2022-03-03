import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { SuatAn } from "../suatan/suatan.entity";
import { VatTu } from "../vattu/vattu.entity";

// @Entity('SV_FAMILY_.Pos$ph66_E')
@Entity({ name: 'Pos$ct66_EH' })
export class ChiTietSuatAn {
    @PrimaryGeneratedColumn({ name: 'id_auto' })
    id_auto: number

    @Column({ name: 'ID_phieu' })
    ID_phieu: number
    
    @Column({ name: 'Ma_vt', type: "char" })
    Ma_vt: string

    @Column({ name: 'So_luong' })
    So_luong: number

    @Column({ name: 'Gia' })
    Gia?: number

    @Column({ name: 'Dvt' })
    Dvt?: string

    @ManyToOne(() => SuatAn, suatan => suatan.chitietsuatans)
    @JoinColumn({ name: "ID_phieu" })
    suatan: SuatAn


    @OneToOne(() => VatTu)
    @JoinColumn({ name: "Ma_vt"})
    vattu: VatTu


}