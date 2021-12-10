import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { format } from 'date-fns';
import { Connection } from 'typeorm';

@Injectable()
export class DanhSachCanLamSangService {
  private loctheogoinho = 0;
  constructor(@InjectConnection() readonly connection: Connection) {}
  async getDanhSachCanLamSang() {
    const stored = `SET NOCOUNT ON;

    DECLARE @Tungay DATETIME=CAST(CAST(GETDATE() AS  date) AS DATETIME)    
    DECLARE @Denngay DATETIME=CAST(CAST(dateadd(DAY,1,GETDATE()) AS  date) AS DATETIME)
    ;with K1 as(
      SELECT 
      [dbo].[GD2_GetID_LoaiTheBHCCByID_LuotKham](k.ID_LuotKham) IsDichVuCC,
        isnull(k.ID_PhongChuyenMon,0) AS ID_PhongChuyenMon,
        k.ID_Kham,			
        k.ID_LuotKham, 
        k.ID_LoaiKham,
        DM_LoaiKham.XetNghiem,
        DM_LoaiKham.TenLoaiKham,
        NgayGioTao,	
        k.BSChiDinh,
        k.NguoiThucHien AS BSChanDoan,	
        k.NgayGioChanDoan as NgayGioKetThuc,
        k.ID_TrangThai,
        k.SoNgayLuuHinhKQ AS SampleID,
        DM_LoaiKham.ID_NhomCLS
        ,k.NgayGioThucHien
        ,k.NgayGioChanDoan
      FROM Kham k WITH (NOLOCK)
    JOIN DM_LoaiKham ON k.ID_LoaiKham =	DM_LoaiKham.ID_LoaiKham
    WHERE   
    (k.ID_TrangThai IS NOT NULL AND k.ID_TrangThai!='' AND k.ID_TrangThai!='HuyBo')				 
    AND
     k.NgayGioTao BETWEEN @Tungay AND @Denngay
    --AND (DM_LoaiKham.ThuocNhomXepHangCLS = 1)
    AND( DM_LoaiKham.ID_NhomCLS<>20)
    -- Nam bổ sung 11/6/19 Theo yêu cầu GS Minh ở asana
    --79	MÁU VÀ CHẾ PHẨM
    --86	PHỤ THU
    --89	VẬT TƯ Y TẾ
    --91	DỊCH VỤ KHÁC
    --101	PHÍ YÊU CẦU BÁC SỸ
    AND( DM_LoaiKham.ID_NhomCLS<>79)
    AND( DM_LoaiKham.ID_NhomCLS<>86)
    AND( DM_LoaiKham.ID_NhomCLS<>89)
    AND( DM_LoaiKham.ID_NhomCLS<>91)
    AND( DM_LoaiKham.ID_NhomCLS<>101)
    -----------------
    AND ((k.ExtField1 != 'DieuTriPhoiHop' AND k.ExtField1 != 'PHYSIO') or k.ExtField1 IS NULL)
    )
    ,XetNghiem AS (
      SELECT 
      MAX(IsDichVuCC)IsDichVuCC,
      MAX(ID_PhongChuyenMon)ID_PhongChuyenMon,
      MAX(K1.ID_Kham)ID_Kham,			
        ID_LuotKham, 
      MAX(ID_LoaiKham)ID_LoaiKham,
      MAX(CASE WHEN XetNghiem=1 THEN 1 ELSE 0 END)XetNghiem,
      N'Xét nghiệm' AS TenLoaiKham,
      MAX(NgayGioTao)NgayGioTao,	
      MAX(BSChiDinh)BSChiDinh,
      MAX(BSChanDoan)BSChanDoan,	
      MAX(NgayGioKetThuc)NgayGioKetThuc,
      MAX(ID_TrangThai)ID_TrangThai,
      K1.SampleID,
      MAX (ID_NhomCLS) AS ID_NhomCLS
      ,MAX(NgayGioThucHien) as NgayGioThucHien
      ,MAX(NgayGioChanDoan) AS  NgayGioChanDoan
      FROM K1 
      WHERE 	K1.SampleID IS NOT NULL  AND K1.XetNghiem=1
      group by ID_LuotKham,K1.SampleID
    )
    ,NonXetNghiem AS (
      SELECT 
      IsDichVuCC,
      ID_PhongChuyenMon,
      K1.ID_Kham,			
      ID_LuotKham, 
      ID_LoaiKham,
      CASE WHEN XetNghiem=1 THEN 1 ELSE 0 END XetNghiem,
      TenLoaiKham,
      NgayGioTao,	
      BSChiDinh,
      BSChanDoan,	
      NgayGioKetThuc,
      ID_TrangThai,
      K1.SampleID,
      ID_NhomCLS,
      NgayGioThucHien
      ,NgayGioChanDoan
      FROM K1 
      WHERE 	K1.SampleID IS NULL  OR K1.XetNghiem=0
    
    )
    ,K2 AS (
    SELECT * FROM XetNghiem
    UNION ALL
    SELECT * FROM NonXetNghiem
    )
    SELECT 
    TTLK.ID_BenhNhan
    ,convert(nvarchar(30),NgayGioDuKienDen,126) AS NgayGioDuKienDen
    ,DM_BenhNhan.MaBenhNhan
    ,DM_BenhNhan.HoLotBenhNhan + ' ' + DM_BenhNhan.TenBenhNhan AS TenBenhNhan
    ,CONVERT(INT, YEAR(GETDATE()) - DM_BenhNhan.NamSinh, 101) AS Tuoi
    ,dbo.LayGioiTinh(DM_BenhNhan.GioiTinh) AS GioiTinh
    ,TTLK.LoaiDoiTuongKham
    ,TTLK.ID_PhanLoaiKham
    ,DM_PhanLoaiKham.TenPhanLoaiKham
    ,TTLK.ID_LichHen
    ,LichHenKham.GioHenKham
    ,DM_NhanVien.NickName AS TenBSChiDinh
    ,TTLK.NgayGioHenTraKQ
    ,dbo.ExistPatientNotesByID_LuotKham(K2.ID_LuotKham) AS NotesStatus
    ,DM_NhanVien1.NickName AS NguoiThucHien
    ,SoPhieuKhamGoiLoa
    ,( SELECT   STUFF(( SELECT N';' +CONVERT( nvarchar,NhomXepHangChiTiet.ID_NhomXepHang)  
    From NhomXepHangChiTiet 
    where NhomXepHangChiTiet.ID_LoaiKham=K2.ID_LoaiKham
    for xml path('')), 1, 0, '') ) AS nhomxephang
    ,CASE WHEN NgayGioDuKienDen IS NULL THEN -1
    when DATEDIFF(second,GETDATE(),NgayGioDuKienDen)>=0 
    THEN DATEDIFF(second,GETDATE(),NgayGioDuKienDen) ELSE DATEDIFF(second,GETDATE(),NgayGioDuKienDen) END
    AS SoGiayConLai	
    ,dttcbn.TenTrangThaiCLSCuaBenhNhan AS TenTrangThai
    
    ,IsDichVuCC
    ,ID_PhongChuyenMon
    ,K2.ID_Kham
    ,K2.ID_LuotKham
    ,K2.ID_LoaiKham
    ,XetNghiem
    ,TenLoaiKham
    ,NgayGioTao
    ,BSChiDinh
    ,BSChanDoan
    ,CONVERT(VARCHAR(5),K2.NgayGioKetThuc, 108) as NgayGioKetThuc
    ,K2.ID_TrangThai
    ,K2.SampleID
    ,convert(nvarchar(30),GETDATE(),126) AS NgayGioLuuCache
    ,GD2_KhamMapXepHang.TrangThai as TrangThaiXepHang
    ,nc.TenForm
    ,nc.TenNhom
    ,K2.NgayGioThucHien
    FROM K2
    JOIN DM_TrangThaiCLSCuaBenhNhan dttcbn ON K2.ID_TrangThai=dttcbn.ID4Dev
    LEFT JOIN GD2_KhamMapXepHang (nolock) ON GD2_KhamMapXepHang.Id_Kham=K2.ID_Kham
    JOIN ThongTinLuotKham (nolock) TTLK  ON K2.ID_LuotKham = TTLK.ID_LuotKham 
    LEFT JOIN DM_BenhNhan ON TTLK.ID_BenhNhan = DM_BenhNhan.ID_BenhNhan 
    LEFT JOIN DM_PhanLoaiKham ON TTLK.ID_PhanLoaiKham = DM_PhanLoaiKham.ID_PhanLoaiKham 
    LEFT JOIN DM_NhanVien ON K2.BSChiDinh = DM_NhanVien.ID_NhanVien 
    OUTER APPLY(SELECT TOP 1 GioHenKham,ID_LuotKham From LichHenKham (nolock) Where LichHenKham.ID_Kham IS NULL 
    And LichHenKham.HuyHen = 0 AND K2.ID_LuotKham = LichHenKham.ID_LuotKham)LichHenKham --Loại bỏ các lịch hẹn do Điều trị phối hợp, VLTL tạo ra   
    LEFT JOIN DM_NhanVien as DM_NhanVien1 on K2.BSChanDoan=DM_NhanVien1.ID_NhanVien
    LEFT JOIN NhomCLS nc ON K2.ID_NhomCLS=nc.ID_NhomCLS
    order by NgayGioChanDoan desc,
    CASE
     WHEN GD2_KhamMapXepHang.TrangThai IS NULL THEN 10 -- không theo quy trình xếp hàng
     WHEN GD2_KhamMapXepHang.TrangThai=3 THEN 9 -- Gọi nhỡ
     WHEN GD2_KhamMapXepHang.TrangThai=2 THEN 8 -- Đã xong và chyển qua phòng khác (Có thể trường hợp click nhầm chuyển về lại DS dang chờ)
     WHEN GD2_KhamMapXepHang.TrangThai=1 THEN 7 -- Đang di chuyển đến 
     ELSE 0
     END,
    CASE 
      -- ĐANG DI CHUYEN
      WHEN (NgayGioDuKienDen IS NOT NULL AND IsDichVuCC>1) THEN 5
      WHEN (NgayGioDuKienDen IS NOT NULL AND CONVERT(VARCHAR(50), YEAR(GETDATE()) - DM_BenhNhan.NamSinh, 101)<6) THEN 6
      WHEN (NgayGioDuKienDen IS NOT NULL AND CONVERT(VARCHAR(50), YEAR(GETDATE()) - DM_BenhNhan.NamSinh, 101)>70) THEN 7
      WHEN NgayGioDuKienDen IS NOT NULL THEN 8
      -- CHUA DI CHUYEN
      WHEN (NgayGioDuKienDen IS NULL AND IsDichVuCC>1) THEN 10
      WHEN (NgayGioDuKienDen IS NULL AND CONVERT(VARCHAR(50), YEAR(GETDATE()) - DM_BenhNhan.NamSinh, 101)<6) THEN 20
      WHEN (NgayGioDuKienDen IS NULL AND CONVERT(VARCHAR(50), YEAR(GETDATE()) - DM_BenhNhan.NamSinh, 101)>70) THEN 30
      ELSE 100
    END
    ,
    CASE 
      WHEN NgayGioDuKienDen IS NULL THEN 999999
      when NgayGioDuKienDen>=GETDATE() THEN DATEDIFF(second,GETDATE(),NgayGioDuKienDen) 
      ELSE DATEDIFF(second,GETDATE(),NgayGioDuKienDen)  
    END
    ,NgayGioDuKienDen
    OPTION (RECOMPILE)
    --OPTION (OPTIMIZE FOR UNKNOWN)`;
    const data = await this.connection.query(`${stored}`);
    return data;
  }
  trans_getDanhSachCanLamSang(dataDanhSachCanLamSang: any, dataFilter: any) {
    const dataFilterNew = dataFilter.split('||');
    const loai = dataFilterNew[0];
    const id_send = dataFilterNew[1];
    let mangtam: any;
    if (dataFilterNew.length >= 3) {
      this.loctheogoinho = dataFilterNew[2];
    } else {
      this.loctheogoinho = 0;
    }

    const recordsets = dataDanhSachCanLamSang;
    let dataReturn = {};
    if (recordsets.length == 0) {
      dataReturn = {
        dangcho: [],
        dangkham: [],
        daxong: [],
      };
    } else {
      const dangcho: any[] = [];
      const dangkham: any[] = [];
      const daxong: any[] = [];
      let n1 = 0;
      let n2 = 0;
      let n3 = 0;
      for (let i = 0; i < recordsets.length; i += 1) {
        mangtam = recordsets[i];
        if (mangtam.nhomxephang == null) {
          mangtam.nhomxephang = 'a';
        }
        const NgayGioHienTai = new Date();
        NgayGioHienTai.setHours(NgayGioHienTai.getHours() + 7);

        if (
          mangtam.ID_TrangThai === 'DangCho' &&
          (loai === 'all' ||
            (loai === 'phong' && mangtam.ID_PhongChuyenMon === id_send) ||
            (loai === 'nhom' && mangtam.nhomxephang.indexOf(id_send) > -1)) &&
          (this.loctheogoinho === 0 ||
            (this.loctheogoinho === 1 && mangtam.TrangThaiXepHang === 3))
        ) {
          dangcho[n1] = {
            id: n1,
            ID_Kham: mangtam.ID_Kham,
            ID_LuotKham: mangtam.ID_LuotKham,
            MaBenhNhan: mangtam.MaBenhNhan,
            TenBenhNhan: mangtam.TenBenhNhan,
            Tuoi: mangtam.Tuoi,
            GioiTinh: mangtam.GioiTinh,
            TenLoaiKham: mangtam.TenLoaiKham,
            GioHenKham: mangtam.GioHenKham,
            NgayGioTao: mangtam.NgayGioTao
              ? format(new Date(this.toIsoString(mangtam.NgayGioTao)), 'HH:mm')
              : '',
            TenBSChiDinh: mangtam.TenBSChiDinh,
            GhiChu: mangtam.GhiChu,
            GoiKham: mangtam.GoiKham,
            NotesStatus: mangtam.NotesStatus,
            ID_BenhNhan: mangtam.ID_BenhNhan,
            ID_LoaiKham: mangtam.ID_LoaiKham,
            LoaiDoiTuongKham: mangtam.LoaiDoiTuongKham,
            IsDichVuCC: mangtam.IsDichVuCC,
            SoPhieuKhamGoiLoa: mangtam.SoPhieuKhamGoiLoa,
            ID_PhongChuyenMon: mangtam.ID_PhongChuyenMon,
            ID_TrangThai: mangtam.ID_TrangThai,
            TenTrangThai: mangtam.TenTrangThai,
            SoGiayConLai: mangtam.SoGiayConLai,
            NgayGioDuKienDen: mangtam.NgayGioDuKienDen,
            NgayGioLuuCache: mangtam.NgayGioLuuCache,
            TrangThaiXepHang: mangtam.TrangThaiXepHang,
            NgayGioHienTai,
            NgayGioThucHien: mangtam.NgayGioThucHien
              ? format(
                  new Date(this.toIsoString(mangtam.NgayGioThucHien)),
                  'HH:mm',
                )
              : '',
          };
          n1 += 1;
        }
        if (
          (mangtam.ID_TrangThai === 'DangKham' ||
            mangtam.ID_TrangThai === 'DaThucHien' ||
            mangtam.ID_TrangThai === 'DaLayBenhPham') &&
          (loai === 'all' ||
            (loai === 'phong' && mangtam.ID_PhongChuyenMon === id_send) ||
            (loai === 'nhom' && mangtam.nhomxephang.indexOf(id_send) > -1))
        ) {
          dangkham[n2] = {
            id: n2,
            ID_Kham: mangtam.ID_Kham,
            ID_LuotKham: mangtam.ID_LuotKham,
            MaBenhNhan: mangtam.MaBenhNhan,
            TenBenhNhan: mangtam.TenBenhNhan,
            Tuoi: mangtam.Tuoi,
            GioiTinh: mangtam.GioiTinh,
            TenLoaiKham: mangtam.TenLoaiKham,
            GioHenKham: mangtam.GioHenKham,
            NgayGioTao: mangtam.NgayGioTao
              ? format(new Date(this.toIsoString(mangtam.NgayGioTao)), 'HH:mm')
              : '',
            TenBSChiDinh: mangtam.TenBSChiDinh,
            GhiChu: mangtam.GhiChu,
            GoiKham: mangtam.GoiKham,
            NotesStatus: mangtam.NotesStatus,
            ID_BenhNhan: mangtam.ID_BenhNhan,
            ID_LoaiKham: mangtam.ID_LoaiKham,
            LoaiDoiTuongKham: mangtam.LoaiDoiTuongKham,
            IsDichVuCC: mangtam.IsDichVuCC,
            SoPhieuKhamGoiLoa: mangtam.SoPhieuKhamGoiLoa,
            ID_PhongChuyenMon: mangtam.ID_PhongChuyenMon,
            ID_TrangThai: mangtam.ID_TrangThai,
            TenTrangThai: mangtam.TenTrangThai,
            NgayGioHenTraKQ: mangtam.NgayGioHenTraKQ
              ? format(
                  new Date(this.toIsoString(mangtam.NgayGioHenTraKQ)),
                  'HH:mm dd/MM/yyyy',
                )
              : '',
            TenNguoiThucHien: mangtam.NguoiThucHien,
            SoGiayConLai: mangtam.SoGiayConLai,
            NgayGioDuKienDen: mangtam.NgayGioDuKienDen,
            NgayGioLuuCache: mangtam.NgayGioLuuCache,
            TrangThaiXepHang: mangtam.TrangThaiXepHang,
            NgayGioHienTai,
            NgayGioThucHien: mangtam.NgayGioThucHien
              ? format(
                  new Date(this.toIsoString(mangtam.NgayGioThucHien)),
                  'HH:mm',
                )
              : '',
          };
          n2 += 1;
        }
        if (mangtam.NgayGioKetThuc == null) {
          mangtam.NgayGioKetThuc = '';
        }
        if (
          mangtam.ID_TrangThai === 'Xong' &&
          (loai === 'all' ||
            (loai === 'phong' && mangtam.ID_PhongChuyenMon === id_send) ||
            (loai === 'nhom' && mangtam.nhomxephang.indexOf(id_send) > -1))
        ) {
          daxong[n3] = {
            id: n3,
            ID_Kham: mangtam.ID_Kham,
            MaBenhNhan: mangtam.MaBenhNhan,
            TenBenhNhan: mangtam.TenBenhNhan,
            Tuoi: mangtam.Tuoi,
            GioiTinh: mangtam.GioiTinh,
            TenLoaiKham: mangtam.TenLoaiKham,
            NgayGioKetThuc: mangtam.NgayGioKetThuc,
            NgayGioTao: mangtam.NgayGioTao
              ? format(new Date(this.toIsoString(mangtam.NgayGioTao)), 'HH:mm')
              : '',
            ID_LoaiKham: mangtam.ID_LoaiKham,
            ID_TrangThai: mangtam.ID_TrangThai,
            ID_BenhNhan: mangtam.ID_BenhNhan,
            ID_LuotKham: mangtam.ID_LuotKham,
            IsDichVuCC: mangtam.IsDichVuCC,
            SoPhieuKhamGoiLoa: mangtam.SoPhieuKhamGoiLoa,
            ID_PhongChuyenMon: mangtam.ID_PhongChuyenMon,
            TenTrangThai: mangtam.TenTrangThai,
            SoGiayConLai: mangtam.SoGiayConLai,
            NgayGioDuKienDen: mangtam.NgayGioDuKienDen,
            NgayGioLuuCache: mangtam.NgayGioLuuCache,
            TrangThaiXepHang: mangtam.TrangThaiXepHang,
            NgayGioHienTai,
            NgayGioThucHien: mangtam.NgayGioThucHien
              ? format(
                  new Date(this.toIsoString(mangtam.NgayGioThucHien)),
                  'HH:mm',
                )
              : '',
          };
          n3 += 1;
        }
      }
      dataReturn = {
        dangcho,
        dangkham,
        daxong: daxong,
      };
    }
    return dataReturn;
  }
  vantayCanLamSang(dataDanhSachCanLamSang: any, dataVanTay: any) {
    const recordsets = dataDanhSachCanLamSang;
    const mangVanTay: any[] = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < recordsets.length; ++index) {
      try {
        if (recordsets[index].ID_BenhNhan === dataVanTay.ID_BenhNhan) {
          if (
            dataVanTay.ID_NhomXepHang &&
            recordsets[index].nhomxephang.indexOf(dataVanTay.ID_NhomXepHang) >
              -1
          ) {
            if (recordsets[index].ID_TrangThai === 'DangCho') {
              if (mangVanTay.length === 0) {
                mangVanTay.push({
                  TenCanLamSang: recordsets[index].TenForm,
                  ID_Kham: recordsets[index].ID_Kham,
                  NgayGioTao: recordsets[index].NgayGioTao
                    ? format(
                        new Date(
                          this.toIsoString(recordsets[index].NgayGioTao),
                        ),
                        'HH:mm',
                      )
                    : '',
                  ID_LoaiKham: recordsets[index].ID_LoaiKham,
                  ID_TrangThai: recordsets[index].ID_TrangThai,
                  ID_BenhNhan: recordsets[index].ID_BenhNhan,
                  TenBenhNhan: recordsets[index].TenBenhNhan,
                  TenNhom: recordsets[index].TenNhom,
                  TenLoaiKham: recordsets[index].TenLoaiKham,
                });
              } else {
                let flag = 0;
                // eslint-disable-next-line no-plusplus
                for (let y = 0; y < mangVanTay.length; ++y) {
                  if (
                    mangVanTay[y].TenCanLamSang === recordsets[index].TenForm
                  ) {
                    flag = 1;
                    mangVanTay[y].TenLoaiKham +=
                      String.fromCharCode(13) +
                      String.fromCharCode(10) +
                      recordsets[index].TenLoaiKham;
                    break;
                  }
                }
                if (flag === 0) {
                  mangVanTay.push({
                    TenCanLamSang: recordsets[index].TenForm,
                    ID_Kham: recordsets[index].ID_Kham,
                    NgayGioTao: recordsets[index].NgayGioTao
                      ? format(
                          new Date(
                            this.toIsoString(recordsets[index].NgayGioTao),
                          ),
                          'HH:mm',
                        )
                      : '',
                    ID_LoaiKham: recordsets[index].ID_LoaiKham,
                    ID_TrangThai: recordsets[index].ID_TrangThai,
                    ID_BenhNhan: recordsets[index].ID_BenhNhan,
                    TenBenhNhan: recordsets[index].TenBenhNhan,
                    TenNhom: recordsets[index].TenNhom,
                    TenLoaiKham: recordsets[index].TenLoaiKham,
                  });
                }
              }
            }
          }
        }
      } catch (error) {
        console.log(recordsets[index]);
        console.log(error);
      }
    }
    return mangVanTay;
  }
  toIsoString(date: any) {
    if (date) {
      const tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function (num) {
          const norm = Math.floor(Math.abs(num));

          return (norm < 10 ? '0' : '') + norm;
        };

      return (
        date.getFullYear() +
        '-' +
        pad(date.getMonth() + 1) +
        '-' +
        pad(date.getDate()) +
        'T' +
        pad(date.getHours()) +
        ':' +
        pad(date.getMinutes()) +
        ':' +
        pad(date.getSeconds()) +
        '.' +
        date.getMilliseconds() +
        dif +
        pad(tzo / 60) +
        ':' +
        pad(tzo % 60)
      );
    }
    return '';
  }
}
