import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class LienKetMoiQuanHeBenhNhanService {
  constructor(@InjectConnection() readonly connection: Connection) {}

  async exec_getidloaiquanhe_moiquanhebenhnhan(id: number) {
    let stored = `SELECT gbnqh.ID_LoaiQuanHe
    FROM GD2_BenhNhan_QuanHe gbnqh WHERE gbnqh.ID_MoiQuanHe=@0`;

    let data = await this.connection.query(`${stored}`, [id]);
    return data;
  }

  async exec_getgioitinh_moiquanhebenhnhan(id: number) {
    let stored = `SELECT isnull(dm.Is_Lay_GioiTinh,0) as gioitinh
    FROM GD2_BenhNhan_QuanHe gbnqh 
    JOIN GD2_DM_LoaiQuanHeGiaDinh dm ON dm.ID_LoaiQuanHe = gbnqh.ID_LoaiQuanHe                                   
WHERE gbnqh.ID_MoiQuanHe=@0`;

    let data = await this.connection.query(`${stored}`, [id]);
    return data;
  }

  async exec_lienket_moiquanhebenhnhan(id: number, gioitinh:boolean) {
    let stored= '';
    if(gioitinh == true){
       stored = `;with bid as(SELECT top 1 ID_MoiQuanHe,dm.GioiTinh_QuanHe,dm.Is_Lay_GioiTinh
        FROM GD2_LoaiQuanHeGiaDinhCheo_chitiet
        JOIN GD2_DM_LoaiQuanHeGiaDinh dm ON GD2_LoaiQuanHeGiaDinhCheo_chitiet.ID_MoiQuanHe=dm.ID_LoaiQuanHe
        WHERE ID_LoaiQuanHeGiaDinhCheo IN (
        SELECT GD2_LoaiQuanHeGiaDinhCheo.id FROM GD2_LoaiQuanHeGiaDinhCheo
        left JOIN GD2_LoaiQuanHeGiaDinhCheo_chitiet ON GD2_LoaiQuanHeGiaDinhCheo.id=GD2_LoaiQuanHeGiaDinhCheo_chitiet.ID_LoaiQuanHeGiaDinhCheo	 
        WHERE ID_MoiQuanHe=@0
        )AND  ID_MoiQuanHe<>@0
      ) 	
      SELECT top 1 bid.ID_MoiQuanHe as ID_MoiQuanHe_ConLai FROM bid
      join DM_BenhNhan dbn
      on bid.GioiTinh_QuanHe=dbn.GioiTinh`;
    }
    if(gioitinh == false){
      stored = `;with bid as(SELECT top 1 ID_MoiQuanHe,dm.GioiTinh_QuanHe,dm.Is_Lay_GioiTinh
        FROM GD2_LoaiQuanHeGiaDinhCheo_chitiet
        JOIN GD2_DM_LoaiQuanHeGiaDinh dm ON GD2_LoaiQuanHeGiaDinhCheo_chitiet.ID_MoiQuanHe=dm.ID_LoaiQuanHe
        WHERE ID_LoaiQuanHeGiaDinhCheo IN (
        SELECT GD2_LoaiQuanHeGiaDinhCheo.id FROM GD2_LoaiQuanHeGiaDinhCheo
        left JOIN GD2_LoaiQuanHeGiaDinhCheo_chitiet ON GD2_LoaiQuanHeGiaDinhCheo.id=GD2_LoaiQuanHeGiaDinhCheo_chitiet.ID_LoaiQuanHeGiaDinhCheo	 
        WHERE ID_MoiQuanHe=@0
        )AND  ID_MoiQuanHe<>@0
      ) 	
      SELECT TOP 1 bid.ID_MoiQuanHe as ID_MoiQuanHe_ConLai FROM bid`;
    }
    

    let data = await this.connection.query(`${stored}`, [id]);
    return data;
  }

  async exec_getmoiquanhebenhnhan(lienket: any, gioitinh: boolean) {
    // --SELECT top 1 bid.ID_MoiQuanHe FROM bid
    // --join DM_BenhNhan dbn
    // --on bid.GioiTinh_QuanHe=dbn.GioiTinh

    if (gioitinh === true) {
      const result = lienket[0].ID_MoiQuanHe;
      return result;
    }
    if (gioitinh == false) {
      const result = lienket[0].ID_MoiQuanHe;
      return result;
    }
  }
}
