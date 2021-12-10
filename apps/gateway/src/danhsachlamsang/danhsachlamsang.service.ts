import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class DanhSachLamSangService {
  constructor(@InjectConnection() readonly connection: Connection) {}

  async getDanhSachLamSangDangCho() {
    const stored = `SET NOCOUNT ON
    --Select DS khám LS chính
    SELECT 
    
    --kha TM add phát hiện đối tượng DVCC 1: là DVCC,0 ngược lại
    CASE WHEN
     (((DM_BenhNhan.ID_QuocTich<>0 and DM_BenhNhan.ID_QuocTich<>142 and DM_BenhNhan.ID_QuocTich<>143 and DM_BenhNhan.ID_QuocTich<>138) ) 
     or (ThongTinLuotKham.ID_TheBHCC is NOT NULL AND(ThongTinLuotKham.ID_TheBHCC!=0))) then 1
              ELSE  0
     END IsDichVuCC,
    --kha TM add phát hiện đối tượng DVCC
    
        ThongTinLuotKham.ID_LuotKham,
        RANK() OVER (ORDER BY GD2_DatLichOnline.BatDau DESC, DM_PhanLoaiKham.STT ASC, ThongTinLuotKham.ThoiGianVaoKham) AS STT,
        --DM_PhanLoaiKham.STT,
        ThongTinLuotKham.ID_BenhNhan,
        DM_BenhNhan.MaBenhNhan, 
        DM_BenhNhan.HoLotBenhNhan + ' ' + DM_BenhNhan.TenBenhNhan AS TenBenhNhan,
        CONVERT(VARCHAR(50), YEAR(GETDATE()) - DM_BenhNhan.NamSinh, 101) AS Tuoi, 
            dbo.LayGioiTinh(DM_BenhNhan.GioiTinh) AS GioiTinh, --(CASE DM_BenhNhan.GioiTinh WHEN 0 THEN N'Nam' ELSE N'Nữ' END) AS GioiTinh,
        case ThongTinLuotKham.LoaiDoiTuongKham
        WHEN N'BHYT' THEN N'BHYT'
        ELSE N'Viện phí'
        END LoaiDoiTuongKham,
        ThongTinLuotKham.ID_PhanLoaiKham,
        DM_PhanLoaiKham.TenPhanLoaiKham, 
        ThongTinLuotKham.ID_LichHen,-- delete 28/11/2013.
        CONVERT(VARCHAR(5),GD2_DatLichOnline.BatDau, 108) as  GioHenKham,		
        CONVERT(VARCHAR(5), ThongTinLuotKham.ThoiGianVaoKham, 108) as  ThoiGianKham, 
        ThongTinLuotKham.ThoiGianVaoKham,
        ThongTinLuotKham.BSYeuCau, 
        DM_NhanVien.NickName AS TenBSYeuCau, --(DM_NhanVien.HoLotNhanVien + ' ' + DM_NhanVien.TenNhanVien) AS TenBSYeuCau,
        '' AS BSTruoc,
        ThongTinLuotKham.BSLamSang,	
        'Ghi chú' AS GhiChu,-- ThongTinLuotKham.GhiChu,
        ThongTinLuotKham.SanSangGoiVaoKham, 
        ThongTinLuotKham.ChoDeTraKetQua, 		
        ThongTinLuotKham.NgayGioHenTraKQ, 		
        ThongTinLuotKham.LayDauHieuSinhTon, 
        ThongTinLuotKham.BSKhamXong,
        N'Bệnh án' AS GoiKham,--N'Gọi khám' AS GoiKham,
        ThongTinLuotKham.ID_TrangThai,--'' AS ID_TrangThai
        dbo.ExistPatientNotesByID_LuotKham(ThongTinLuotKham.ID_LuotKham) AS NotesStatus, --Added 09.05.2012
        ThongTinLuotKham.ID_LoaiKham,
        NULL AS ID_Kham,		
        NULL AS TenLoaiKham,
        dbo.LayNoiDungTaiKhamLuotKhamTruoc(ThongTinLuotKham.ID_BenhNhan) AS NoiDungTaiKham, --Added 04.01.13
        ThongTinLuotKham. ID_PhongKhamVatLy,
        ThongTinLuotKham.ID_Tang,	ThongTinLuotKham. SoPhieuKhamGoiLoa,
        dbo.GD2_ThongTinLuotKham_LayTenBSKhamLamSangLanTruoc(ThongTinLuotKham.ID_BenhNhan) as bstruoc,
        CONVERT(VARCHAR(5), ThongTinLuotKham.NgayGioHenTraKQ, 108)+' '+CONVERT(VARCHAR(10), ThongTinLuotKham.NgayGioHenTraKQ, 103 ) AS NgayGioHenTraKQ_New
        ,GD2_Dm_ChuyenKhoa.Ten AS TenChuyenKhoa
        ,ThongTinLuotKham.ID_ChuyenKhoa
        ,ISNULL(GD2_CauHinh_ChuyenKhoa_Offline_ChuyenKhoa_Online.ID_ChuyenKhoa_Online,0)ID_ChuyenKhoa_Online
        ,CASE WHEN ID_BacSiYeuCau_ChamSocKhachHang=ThongTinLuotKham.BSYeuCau THEN 0 ELSE 1
        END  Is_BacSiYeuCau_ChamSocKhachHang
        ,GD2_Lich_Online_TrieuChung.TenTrieuChung
    FROM         ThongTinLuotKham with (nolock) 
       JOIN DM_BenhNhan ON ThongTinLuotKham.ID_BenhNhan = DM_BenhNhan.ID_BenhNhan 
       LEFT  JOIN DM_PhanLoaiKham ON ThongTinLuotKham.ID_PhanLoaiKham = DM_PhanLoaiKham.ID_PhanLoaiKham 
       LEFT  JOIN DM_NhanVien ON ThongTinLuotKham.BSYeuCau = DM_NhanVien.ID_NhanVien 
         LEFT  JOIN GD2_DatLichOnline ON ThongTinLuotKham.ID_LuotKham = GD2_DatLichOnline.ID_LuotKham
         LEFT  JOIN DM_PhongBan ON DM_PhongBan.ID_PhongBan = ThongTinLuotKham.ID_PhongKhamVatLy
                 -- AND LichHenKham.ID_Kham IS NULL --Loại trừ các lịch hẹn do Điều trị phối hợp, VLTL tạo ra
         LEFT JOIN GD2_Dm_ChuyenKhoa on GD2_Dm_ChuyenKhoa.ID_ChuyenKhoa = [ThongTinLuotKham].ID_ChuyenKhoa
         LEFT JOIN GD2_CauHinh_ChuyenKhoa_Offline_ChuyenKhoa_Online      
    ON GD2_Dm_ChuyenKhoa.ID_ChuyenKhoa=GD2_CauHinh_ChuyenKhoa_Offline_ChuyenKhoa_Online.ID_ChuyenKhoa_Offline
       LEFT JOIN GD2_GhiChuTrieuChung_LuotKham ON GD2_GhiChuTrieuChung_LuotKham.ID_LuotKham = ThongTinLuotKham.ID_LuotKham 
       LEFT JOIN GD2_Lich_Online_TrieuChung ON GD2_Lich_Online_TrieuChung.ID_TrieuChung=ThongTinLuotKham.ID_TrieuChung
    WHERE     
        ThongTinLuotKham.ThoiGianVaoKham BETWEEN CAST(CAST(GETDATE() AS  date) AS DATETIME) AND CAST(CAST(dateadd(DAY,1,GETDATE()) AS  date) AS DATETIME)
        AND (ThongTinLuotKham.BSKhamXong = 0)	
        AND (ThongTinLuotKham.DaTraKQ = 0)
        AND (ThongTinLuotKham.ID_TrangThai IS NOT NULL) 			
        AND (ThongTinLuotKham.ID_TrangThai <>'')	
        AND (ThongTinLuotKham.ID_TrangThai <> @0)
        AND (ThongTinLuotKham.ID_TrangThai <> @0 OR @0 IS NULL)
        AND (ThongTinLuotKham.ID_TrangThai <> 'KetThucKham')	
        AND (ThongTinLuotKham.ID_TrangThai <> 'HuyXepHang')
        AND (ThongTinLuotKham.ID_TrangThai <> 'HuyBo')	--khatm add 
        AND ThongTinLuotKham.CoKhamLamSang = 1		
        AND ThongTinLuotKham.ID_PhanLoaiKham !=46-- loại trừ các lượt nội trú	
        AND ThongTinLuotKham.ID_PhanLoaiKham !=49-- loại trừ các lượt Tmy
      
    UNION ALL --DS khám LS phụ
    SELECT 
    --kha TM add phát hiện đối tượng DVCC 1: là DVCC,0 ngược lại
    CASE WHEN
     (((DM_BenhNhan.ID_QuocTich<>0 and DM_BenhNhan.ID_QuocTich<>142 and DM_BenhNhan.ID_QuocTich<>143 and DM_BenhNhan.ID_QuocTich<>138) ) 
     or (ThongTinLuotKham.ID_TheBHCC is NOT NULL AND(ThongTinLuotKham.ID_TheBHCC!=0))) then 1
              ELSE  0
     END IsDichVuCC,
    --kha TM add phát hiện đối tượng DVCC
    
        ThongTinLuotKham.ID_LuotKham,
        RANK() OVER (ORDER BY DM_PhanLoaiKham.STT ASC, ThongTinLuotKham.ThoiGianVaoKham) AS STT,
        --DM_PhanLoaiKham.STT,
        ThongTinLuotKham.ID_BenhNhan, 
        DM_BenhNhan.MaBenhNhan,
        DM_BenhNhan.HoLotBenhNhan + ' ' + DM_BenhNhan.TenBenhNhan AS TenBenhNhan,
        CONVERT(VARCHAR(50), YEAR(GETDATE()) - DM_BenhNhan.NamSinh, 101) AS Tuoi, 
            dbo.LayGioiTinh(DM_BenhNhan.GioiTinh) AS GioiTinh, --(CASE DM_BenhNhan.GioiTinh WHEN 0 THEN N'Nam' ELSE N'Nữ' END) AS GioiTinh,
        case ThongTinLuotKham.LoaiDoiTuongKham
        WHEN N'BHYT' THEN N'BHYT'
        ELSE N'Viện phí'
        END LoaiDoiTuongKham, 
        ThongTinLuotKham.ID_PhanLoaiKham,
        DM_PhanLoaiKham.TenPhanLoaiKham, 
        ThongTinLuotKham.ID_LichHen, 
        CONVERT(VARCHAR(5),GD2_DatLichOnline.BatDau, 108) as  GioHenKham,
        
        CONVERT(VARCHAR(5), ThongTinLuotKham.ThoiGianVaoKham, 108) as  ThoiGianKham, 
        ThongTinLuotKham.ThoiGianVaoKham,
        Kham.NguoiDoc AS BSYeuCau, -- NULL AS BSYeuCau, --ThongTinLuotKham.BSYeuCau, --LS phụ ko cần BS y/c
        dbo.GetNickNameByID_NhanVien(BSYeuCau) AS TenBSYeuCau, --'' AS TenBSYeuCau, --DM_NhanVien.NickName AS TenBSYeuCau, --(DM_NhanVien.HoLotNhanVien + ' ' + DM_NhanVien.TenNhanVien) AS TenBSYeuCau,
        '' AS BSTruoc,
        ThongTinLuotKham.BSLamSang,			
        'Ghi chú' AS GhiChu,-- ThongTinLuotKham.GhiChu,
        ThongTinLuotKham.SanSangGoiVaoKham, 
        ThongTinLuotKham.ChoDeTraKetQua, 		
        ThongTinLuotKham.NgayGioHenTraKQ, 
        ThongTinLuotKham.LayDauHieuSinhTon, 
        ThongTinLuotKham.BSKhamXong,
        N'Bệnh án' AS GoiKham,--N'Gọi khám' AS GoiKham,
        Kham.ID_TrangThai,--'' AS ID_TrangThai
        dbo.ExistPatientNotesByID_LuotKham(ThongTinLuotKham.ID_LuotKham) AS NotesStatus, --Added 09.05.2012
        Kham.ID_LoaiKham,
        Kham.ID_Kham,
        DM_LoaiKham.TenLoaiKham,
        dbo.LayNoiDungTaiKhamLuotKhamTruoc(ThongTinLuotKham.ID_BenhNhan) AS NoiDungTaiKham ,--Added 04.01.13,
          ThongTinLuotKham. ID_PhongKhamVatLy,
        ThongTinLuotKham.Id_Tang,ThongTinLuotKham .SoPhieuKhamGoiLoa,
        dbo.GD2_ThongTinLuotKham_LayTenBSKhamLamSangLanTruoc(ThongTinLuotKham.ID_BenhNhan) as bstruoc,
        CONVERT(VARCHAR(5), ThongTinLuotKham.NgayGioHenTraKQ, 108)+' '+CONVERT(VARCHAR(10), ThongTinLuotKham.NgayGioHenTraKQ, 103 ) AS NgayGioHenTraKQ_New
        ,GD2_Dm_ChuyenKhoa.Ten AS TenChuyenKhoa
        ,ThongTinLuotKham.ID_ChuyenKhoa
        ,ISNULL(GD2_CauHinh_ChuyenKhoa_Offline_ChuyenKhoa_Online.ID_ChuyenKhoa_Online,0)ID_ChuyenKhoa_Online
        ,CASE WHEN ID_BacSiYeuCau_ChamSocKhachHang=ThongTinLuotKham.BSYeuCau THEN 0 ELSE 1 END  Is_BacSiYeuCau_ChamSocKhachHang
        --,1 AS Is_BacSiYeuCau_ChamSocKhachHang
        ,GD2_Lich_Online_TrieuChung.TenTrieuChung
    FROM         ThongTinLuotKham 
    INNER JOIN Kham with (nolock) ON Kham.ID_LuotKham = ThongTinLuotKham.ID_LuotKham 
    LEFT OUTER JOIN DM_LoaiKham ON Kham.ID_LoaiKham = DM_LoaiKham.ID_LoaiKham 
    LEFT OUTER JOIN	DM_BenhNhan ON ThongTinLuotKham.ID_BenhNhan = DM_BenhNhan.ID_BenhNhan 
    LEFT OUTER JOIN DM_PhanLoaiKham ON ThongTinLuotKham.ID_PhanLoaiKham = DM_PhanLoaiKham.ID_PhanLoaiKham 
    LEFT OUTER JOIN DM_NhanVien ON ThongTinLuotKham.BSYeuCau = DM_NhanVien.ID_NhanVien 
    LEFT OUTER JOIN GD2_DatLichOnline ON ThongTinLuotKham.ID_LuotKham = GD2_DatLichOnline.ID_LuotKham
    LEFT JOIN DM_PhongBan ON DM_PhongBan.ID_PhongBan = Kham.ID_PhongChuyenMon
                --AND LichHenKham.ID_Kham IS NULL --Loại trừ các lịch hẹn do Điều trị phối hợp, VLTL tạo ra 
    LEFT JOIN GD2_Dm_ChuyenKhoa on GD2_Dm_ChuyenKhoa.ID_ChuyenKhoa = [ThongTinLuotKham].ID_ChuyenKhoa
    LEFT JOIN GD2_CauHinh_ChuyenKhoa_Offline_ChuyenKhoa_Online     
    ON GD2_Dm_ChuyenKhoa.ID_ChuyenKhoa=GD2_CauHinh_ChuyenKhoa_Offline_ChuyenKhoa_Online.ID_ChuyenKhoa_Offline
    LEFT JOIN GD2_GhiChuTrieuChung_LuotKham ON GD2_GhiChuTrieuChung_LuotKham.ID_LuotKham = ThongTinLuotKham.ID_LuotKham 
    LEFT JOIN GD2_Lich_Online_TrieuChung ON GD2_Lich_Online_TrieuChung.ID_TrieuChung=ThongTinLuotKham.ID_TrieuChung
    
    WHERE     
        ThongTinLuotKham.ThoiGianVaoKham BETWEEN CAST(CAST(GETDATE() AS  date) AS DATETIME) AND CAST(CAST(dateadd(DAY,1,GETDATE()) AS  date) AS DATETIME)
        AND (ThongTinLuotKham.BSKhamXong = 0)
        --AND (ThongTinLuotKham.SanSangGoiVaoKham = 1) -- 11.05.12: Show all
        AND (ThongTinLuotKham.DaTraKQ = 0)
        AND (ThongTinLuotKham.ID_TrangThai IS NOT NULL) 
        AND (ThongTinLuotKham.ID_TrangThai <>'')
        AND (Len(ThongTinLuotKham.ID_TrangThai) > 0)
        AND (Kham.ID_TrangThai <> @0)
        AND (Kham.ID_TrangThai <> @0  OR @0 IS NULL)
        and Kham.ID_TrangThai<>'HuyBo'
        --AND Kham.ID_TrangThai <> 'Xong'
        AND ThongTinLuotKham.CoKhamLamSang = 1
        AND (Kham.IsBacSyChinh = 0 OR (Kham.IsBacSyChinh = 1 AND Kham.ExtField1 = 'DaDuocChuyenQuyenBSChinh')) --LS phụ
        AND (ISNULL(Kham.ExtField1, '') != 'ActiveLater')
        AND DM_LoaiKham.CLS = 0
        AND ISNULL(DM_LoaiKham.ThuocNhomXepHangCLS, 0) = 0		
        AND ThongTinLuotKham.ID_PhanLoaiKham !=46
        AND ThongTinLuotKham.ID_PhanLoaiKham !=49-- loại trừ các lượt Tmy
        
        --	and ThongTinLuotKham.ID_PhanLoaiKham is not null
    ORDER BY --LichHenKham.GioHenKham--,			
        --DM_PhanLoaiKham.STT ASC,
        --ThongTinLuotKham.ThoiGianVaoKham		
        ThongTinLuotKham.ThoiGianVaoKham`;
    const data = await this.connection.query(`${stored}`, ['DangKham', 'Xong']);
    return data;
  }

  async getDanhSachLamSangDangKham() {
    const stored = `SET NOCOUNT ON
    DECLARE @Tungay DATETIME=CAST(CAST(GETDATE() AS  date) AS DATETIME) 
    DECLARE @Denngay DATETIME=CAST(CAST(dateadd(DAY,1,GETDATE()) AS  date) AS DATETIME)
    ;SELECT 
    
    
    --kha TM add phát hiện đối tượng DVCC 1: là DVCC,0 ngược lại
    CASE WHEN
     (((DM_BenhNhan.ID_QuocTich<>0 and DM_BenhNhan.ID_QuocTich<>142 and DM_BenhNhan.ID_QuocTich<>143 and DM_BenhNhan.ID_QuocTich<>138) ) 
     or (ThongTinLuotKham.ID_TheBHCC is NOT NULL AND(ThongTinLuotKham.ID_TheBHCC!=0))) then 1
              ELSE  0
     END IsDichVuCC,
    --kha TM add phát hiện đối tượng DVCC
        ThongTinLuotKham.ID_LuotKham,
        RANK() OVER (ORDER BY DM_PhanLoaiKham.STT ASC, ThongTinLuotKham.ThoiGianVaoKham) AS STT,
        ThongTinLuotKham.ID_BenhNhan,
        DM_BenhNhan.MaBenhNhan, 
        DM_BenhNhan.HoLotBenhNhan + ' ' + DM_BenhNhan.TenBenhNhan AS TenBenhNhan,
        CONVERT(VARCHAR(50), YEAR(GETDATE()) - DM_BenhNhan.NamSinh, 101) AS Tuoi, 
            dbo.LayGioiTinh(DM_BenhNhan.GioiTinh) AS GioiTinh,
        --ThongTinLuotKham.ID_LuotKham, 	   
        case ThongTinLuotKham.LoaiDoiTuongKham
        WHEN N'BHYT' THEN N'BHYT'
        ELSE N'Viện phí'
        END LoaiDoiTuongKham,
        ThongTinLuotKham.ID_PhanLoaiKham,
        DM_LoaiKham.TenLoaiKham AS TenPhanLoaiKham,	
        CONVERT(VARCHAR(5), ThongTinLuotKham.ThoiGianVaoKham, 108) as  ThoiGianKham, 
        ThongTinLuotKham.ThoiGianVaoKham, 
        ThongTinLuotKham.BSYeuCau, 
        (DM_NhanVien.HoLotNhanVien + ' ' + DM_NhanVien.TenNhanVien) AS TenBSYeuCau,
        '' AS BSTruoc,
        BSLamSang = CASE Kham.ID_Kham -- Nếu ko có dòng khám tương ứng thì lấy ThongTinLuotKham.BSLamSang. Modified 02.11.12 
           WHEN NULL THEN bs.NickName
           ELSE bs1.NickName --Lấy BS của dòng khám AS BSLamSang
        END,
        'Ghi chú' AS GhiChu, 		 		  		
        ThongTinLuotKham.SanSangGoiVaoKham, 
        ThongTinLuotKham.ChoDeTraKetQua, 
        CONVERT(VARCHAR(10), ThongTinLuotKham.NgayGioHenTraKQ, 103) + ' ' + CONVERT(VARCHAR(5), ThongTinLuotKham.NgayGioHenTraKQ, 108) as NgayGioHenTraKQ,
        ThongTinLuotKham.BSKhamXong,
        N'Bệnh án' AS GoiKham,
        Kham.ID_TrangThai AS ID_TrangThai,		
        '' AS TenTrangThai,
        ThongTinLuotKham.HoanTatHoSo,
        ThongTinLuotKham.IsRenew,
        ThongTinLuotKham.DaTraKQ,
        dbo.ExistPatientNotesByID_LuotKham(ThongTinLuotKham.ID_LuotKham) AS NotesStatus,
        Kham.ID_Kham,
        Kham.ID_LoaiKham,
        [dbo].[GD2_GetTrangThaiKham_BN](ThongTinLuotKham.ID_LuotKham) TrangThaiHoSo
        ,ThongTinLuotKham.ID_Tang
        ,ThongTinLuotKham.SoPhieuKhamGoiLoa
        ,CONVERT(VARCHAR(5), ThongTinLuotKham.NgayGioHenTraKQ, 108)+' '+CONVERT(VARCHAR(10), ThongTinLuotKham.NgayGioHenTraKQ, 103 ) AS NgayGioHenTraKQ_New
        ,ThongTinLuotKham.NgayGioHenTraKQ AS NgayGioHenTraKQ_New1
    FROM    ThongTinLuotKham 
        INNER JOIN Kham with (nolock) ON Kham.ID_LuotKham = ThongTinLuotKham.ID_LuotKham
        INNER JOIN DM_BenhNhan ON ThongTinLuotKham.ID_BenhNhan = DM_BenhNhan.ID_BenhNhan 
        LEFT  JOIN DM_LoaiKham ON DM_LoaiKham.ID_LoaiKham = Kham.ID_LoaiKham
        LEFT  JOIN DM_PhanLoaiKham ON ThongTinLuotKham.ID_PhanLoaiKham = DM_PhanLoaiKham.ID_PhanLoaiKham 
        LEFT  JOIN DM_NhanVien ON ThongTinLuotKham.BSYeuCau = DM_NhanVien.ID_NhanVien 
        LEFT  JOIN DM_NhanVien bs ON ThongTinLuotKham.BSLamSang = bs.ID_NhanVien 
        LEFT  JOIN DM_NhanVien bs1 ON Kham.NguoiDoc = bs1.ID_NhanVien 
      
        
    
    WHERE   
    (ThongTinLuotKham.ThoiGianVaoKham BETWEEN
    @Tungay AND @Denngay
    --      CAST(GETDATE() AS  date)  
    --AND CAST(dateadd(DAY,1,GETDATE()) AS  date)
    --OR isRenew = 1
    )	
        AND ThongTinLuotKham.ID_PhanLoaiKham != 46		--khatm add 12.7.2014
        AND ThongTinLuotKham.ID_PhanLoaiKham != 49		--khatm add 29.11.2014
        AND (ThongTinLuotKham.BSKhamXong = 0)	
        --AND (Kham.ID_TrangThai = 'DangKham' 		
        --	 OR Kham.ID_TrangThai = 'DangTraKetQua'
        --	 OR Kham.ID_TrangThai = 'KetThucKham'
        --	 OR Kham.ID_TrangThai = 'Xong'
        --	 OR Kham.ID_TrangThai = 'DaThucHien'
        --)
        AND kham.ID_TrangThai IN ('DangKham','DangTraKetQua','KetThucKham','Xong','DaThucHien')
        AND DM_LoaiKham.CLS = 0		
        AND DM_LoaiKham.ThuocNhomXepHangCLS = 0 --added 27.11.12-MinhTQ
        
        ORDER BY 
        --CASE WHEN ((@ID_TrangThai1=N'DangKham' OR @ID_TrangThai2=N'DangTraKetQua') AND ThongTinLuotKham.NgayGioHenTraKQ IS NOT NULL) THEN 0 ELSE 1 END asc,
        CASE WHEN (ThongTinLuotKham.NgayGioHenTraKQ IS NOT NULL) THEN 0 ELSE 1 END asc,-- Nam edit lai order luoi 2 theo thoi gian hen tra KQ
        ThongTinLuotKham.NgayGioHenTraKQ ASC,-- Nam edit lai order luoi 2 theo thoi gian hen tra KQ
        DM_PhanLoaiKham.STT ASC,
          ThongTinLuotKham.ThoiGianVaoKham
    OPTION (RECOMPILE)
    --OPTION (OPTIMIZE FOR UNKNOWN)`;
    const data = await this.connection.query(`${stored}`);
    return data;
  }

  trans_getDanhSachLamSangDangCho(data: any) {
    let dangcho: any[] = [];
    let n1 = 0;
    if (data.length == 0) {
      dangcho = [];
    } else {
      for (let i = 0; i < data.length; i += 1) {
        const mangtam = data[i];
        if (mangtam.SanSangGoiVaoKham) {
          mangtam.SanSangGoiVaoKham = 1;
        } else {
          mangtam.SanSangGoiVaoKham = 0;
        }
        dangcho[n1] = {
          id: n1,
          ID_LuotKham: mangtam.ID_LuotKham,
          MaBenhNhan: mangtam.MaBenhNhan,
          TenBenhNhan: mangtam.TenBenhNhan,
          Tuoi: mangtam.Tuoi,
          GioiTinh: mangtam.GioiTinh,
          TenPhanLoaiKham: mangtam.TenPhanLoaiKham,
          TenLoaiKham: mangtam.TenLoaiKham,
          LoaiDoiTuongKham: mangtam.LoaiDoiTuongKham,
          GioHenKham: mangtam.GioHenKham,
          ThoiGianKham: mangtam.ThoiGianKham,
          TenBSYeuCau: mangtam.TenBSYeuCau,
          bstruoc: mangtam.bstruoc,
          GhiChu: mangtam.GhiChu,
          NoiDungTaiKham: mangtam.NoiDungTaiKham,
          TrangThai: mangtam.ID_TrangThai,
          SanSangGoiVaoKham: mangtam.SanSangGoiVaoKham,
          NotesStatus: mangtam.NotesStatus,
          ID_BenhNhan: mangtam.ID_BenhNhan,
          ID_PhongKhamVatLy: mangtam.ID_PhongKhamVatLy,
          IsDichVuCC: mangtam.IsDichVuCC,
          ID_Tang: mangtam.ID_Tang,
          SoPhieuKhamGoiLoa: mangtam.SoPhieuKhamGoiLoa,
          TenChuyenKhoa: mangtam.TenChuyenKhoa,
          ID_ChuyenKhoa: mangtam.ID_ChuyenKhoa,
          ID_ChuyenKhoa_Online: mangtam.ID_ChuyenKhoa_Online,
          Is_BacSiYeuCau_ChamSocKhachHang:
            mangtam.Is_BacSiYeuCau_ChamSocKhachHang,
          TenTrieuChung: mangtam.TenTrieuChung,
        };
        n1 += 1;
      }
    }
    return dangcho;
  }

  trans_getDanhSachLamSangDangKham(data: any) {
    let dangkham: any[] = [];
    let daxong: any[] = [];
    let n2 = 0;
    let n3 = 0;
    if (data.length == 0) {
      daxong = [];
      dangkham = [];
    } else {
      for (let i = 0; i < data.length; i += 1) {
        const mangtam = data[i];
        if (
          mangtam.ID_TrangThai == 'DangKham' ||
          mangtam.ID_TrangThai == 'DangTraKetQua'
        ) {
          if (mangtam.SanSangGoiVaoKham) {
            mangtam.SanSangGoiVaoKham = 1;
          } else {
            mangtam.SanSangGoiVaoKham = 0;
          }
          if (mangtam.HoanTatHoSo) {
            mangtam.HoanTatHoSo = 1;
          } else {
            mangtam.HoanTatHoSo = 0;
          }
          dangkham[n2] = {
            id: n2,
            ID_LuotKham: mangtam.ID_LuotKham,
            MaBenhNhan: mangtam.MaBenhNhan,
            TenBenhNhan: mangtam.TenBenhNhan,
            Tuoi: mangtam.Tuoi,
            GioiTinh: mangtam.GioiTinh,
            TenPhanLoaiKham: mangtam.TenPhanLoaiKham,
            ThoiGianKham: mangtam.ThoiGianKham,
            NgayGioHenTraKQ: mangtam.NgayGioHenTraKQ,
            NgayGioHenTraKQ_New: mangtam.NgayGioHenTraKQ_New,
            BSLamSang: mangtam.BSLamSang,
            GhiChu: mangtam.GhiChu,
            HoanTatHoSo: mangtam.HoanTatHoSo,
            TrangThaiHoSo: mangtam.TrangThaiHoSo,
            SanSangGoiVaoKham: mangtam.SanSangGoiVaoKham,
            NotesStatus: mangtam.NotesStatus,
            ID_BenhNhan: mangtam.ID_BenhNhan,
            LoaiDoiTuongKham: mangtam.LoaiDoiTuongKham,
            IsDichVuCC: mangtam.IsDichVuCC,
            ID_Tang: mangtam.ID_Tang,
            SoPhieuKhamGoiLoa: mangtam.SoPhieuKhamGoiLoa,
          };
          n2 += 1;
        }
        if (
          mangtam.ID_TrangThai == 'KetThucKham' ||
          mangtam.ID_TrangThai == 'Xong'
        ) {
          daxong[n3] = {
            id: n3,
            ID_LuotKham: mangtam.ID_LuotKham,
            MaBenhNhan: mangtam.MaBenhNhan,
            TenBenhNhan: mangtam.TenBenhNhan,
            Tuoi: mangtam.Tuoi,
            TenPhanLoaiKham: mangtam.TenPhanLoaiKham,
            BSLamSang: mangtam.BSLamSang,
            GhiChu: mangtam.GhiChu,
            NotesStatus: mangtam.NotesStatus,
            ID_BenhNhan: mangtam.ID_BenhNhan,
            DaTraKQ: mangtam.DaTraKQ,
            LoaiDoiTuongKham: mangtam.LoaiDoiTuongKham,
            IsDichVuCC: mangtam.IsDichVuCC,
            ID_Tang: mangtam.ID_Tang,
            SoPhieuKhamGoiLoa: mangtam.SoPhieuKhamGoiLoa,
          };
          n3 += 1;
        }
      }
    }
    return {
      dangkham,
      daxong,
    };
  }
}
