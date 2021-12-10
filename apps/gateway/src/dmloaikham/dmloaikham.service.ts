import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class DMLoaiKhamService {
  constructor(@InjectConnection() readonly connection: Connection) {}
  async exec_gd2_dmloaikham() {
    const stored = `SET NOCOUNT ON
    SELECT
      [DM_LoaiKham].[ID_LoaiKham],
      [TenLoaiKham],
      --[MaVietTat],
      --[MaVietTat_BN],
      [DM_LoaiKham].[ID_NhomCLS],
      --[DM_LoaiKham].[MoTa],
      [GiaBaoChoBN],
      --[GiaThueNgoaiThucHien],
      --[ThoiGianTrungBinhThucHien],
      --[ThoiGianCoKetQua],
      --[DM_LoaiKham].[GhiChu],
      --[LoiKhuyen],
      [DM_LoaiKham].[Active],
      --[DM_LoaiKham].[STT],
      --[CLS],
      --[XetNghiem],
      --[CoLuuKQInRieng],
      --[DieuTriTaiNha],
      --[CoMauNhapKQ],
      --[PathToTemplateFile],
      --[TenLoaiKham_EN],
      --[ReportName],
      --[CoTheKeToa],
      --[ThuocNhomXepHangCLS],
      --[DM_LoaiKham].[PhanTramDieuChinhGiaTaiNha],
      --[DM_LoaiKham].[PhuThuThucHienTaiNha],
      --[GiaTaiNhaDieuChinhTheoNhom],
      --[CoFormChucNangRieng],
      --[MocThoiGianCoKetQua],
      --isnull([SoPhimLonTieuHao],0) as SoPhimLonTieuHao,
      --isnull([SoPhimNhoTieuHao],0) as SoPhimNhoTieuHao,
      --isnull([SoPhimNhuAnhTieuHao],0) as SoPhimNhuAnhTieuHao,
      --[TuyenHuyen],
      --[TuyenTinh],
      --[TuyenTrungUong],
      cast(isnull([GiaBaoHiem],0)AS INT) as GiaBaoHiem,
      --isnull([GiaPhuThuBenhVien],0) as GiaPhuThuBenhVien,
      --[DM_LoaiKham].[ID_Nhom_BHYT],
      TenBHYT,
      --Color,
      NhomCLS.TenNhom,
      GD2_DMNHOM_BHYT.Ten_Nhom_BHYT,
      --PhanTramThue,
      --IsThamMy,
      --STT_BHYT,
      --MaSoTheoDVBHYT,
      --ID_NhomLSP,
      [DM_LoaiKham].hang_id
      --,cast([DM_LoaiKham].KhauHaoThuocVTYT as float) AS KhauHaoThuocVTYT
      --,cast([DM_LoaiKham].KhauHaoDichVu as float) AS KhauHaoDichVu
       
    
    FROM
      [DM_LoaiKham]
    join NhomCLS on DM_LoaiKham.ID_NhomCLS=NhomCLS.ID_NhomCLS
    left join GD2_DMNHOM_BHYT on DM_LoaiKham.ID_Nhom_BHYT=GD2_DMNHOM_BHYT.ID_NHOM_BHYT
    ORDER BY DM_LoaiKham.ID_NhomCLS`;
    const data = await this.connection.query(`${stored}`);
    data.map((item: any) => {
      item['id'] = item['ID_LoaiKham'];
      item['Active'] = item['Active'] == null ? '' : item['Active'] ? 1 : 0;
      return item;
    });
    return data;
  }
}
