import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { ChiTietSuatAn } from "../chitietsuatan/chitietsuatan.entity";
import { VatTu } from "../vattu/vattu.entity";

// @Entity('SV_FAMILY_.Pos$ph66_E')
@Entity({ name: 'Pos$ph66_EH' })


export class SuatAn {
    @PrimaryGeneratedColumn({ name: 'Id_Phieu' })
    Id_Phieu: number

    @Column({ name: 'Id_NguoiTao' })
    Id_NguoiTao: number
    
    @Column({ name: 'Id_BenhNhan' })
    Id_BenhNhan: number

    @Column({ name: 'ngay_ct' })
    ngay_ct: Date

    @Column({ name: 'Id_NguoiDuyet' })
    Id_NguoiDuyet: number

    @Column({ name: 'Loai' })
    Loai: number

    @Column({ name: 'Id_Buoi' })
    Id_Buoi: number

    @Column({ name: 'Diengiai' })
    Diengiai: string
    

    @Column({ name: 'Id_LuotKham' })
    Id_LuotKham: number


    
    @OneToMany(() => ChiTietSuatAn, chitietsuatan => chitietsuatan.suatan)
    chitietsuatans: ChiTietSuatAn[]

    nguoitao:any


}