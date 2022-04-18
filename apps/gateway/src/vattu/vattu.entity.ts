import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { ChiTietSuatAn } from "../chitietsuatan/chitietsuatan.entity";
import { SuatAn } from "../suatan/suatan.entity";

// @Entity('SV_FAMILY_.Pos$ph66_E')
@Entity({ name: 'dmvt2' })


export class VatTu {
    @PrimaryGeneratedColumn({ name: 'Ma_vt' })
    Ma_vt: string

    @Column({ name: 'Ten_vt' })
    Ten_vt: string
    

    // @OneToOne(() => ChiTietSuatAn, chitietsuatan => chitietsuatan.vattu)
    // chitietsuatan: ChiTietSuatAn


}