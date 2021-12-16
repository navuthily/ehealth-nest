import { InjectQueue, Processor } from '@nestjs/bull';
import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectConnection } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Cache } from 'cache-manager';
import { Connection } from 'typeorm';

@Processor('xml-bhyt')
@Injectable()
export class XmlBHYTService {
  constructor(
    @InjectConnection() readonly connection: Connection,
    @InjectQueue('xml-bhyt') private readonly xmlBHYTQueue: Queue,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  @Cron('*/10 * * * *')
  async handleCron() {
    const data = await this.connection.query('EXEC GD2_BHYT_xml_chuachuyen');
    for (let i = 0; i < data.length; i++) {
      this.xmlBHYTQueue.add('xml-bhyt', {
        ID_ThuTraNo: data[i]?.ID_ThuTraNo,
      });
    }
    console.log(new Date() + 'chay bhyt');
  }

  async get_thong_tin(id_thutrano: string, store_name: string) {
    const data = await this.connection.query(
      `EXEC ${store_name} ${id_thutrano}`,
    );
    return data;
  }

  async exec_xml_1_tonghop(idThuTraNo: any) {
    let stored = `SET NOCOUNT ON;
    DECLARE @ID_LuotKham INT
    
    SET @ID_LuotKham = (
            SELECT ID_LuotKham
            FROM   Thu_TraNo
            WHERE  ID_ThuTraNo = @0
        )
    
    
    SELECT ThongTinLuotKham.ID_LuotKham  AS MA_LK
          ,1                             AS STT
          ,DM_BenhNhan.MaBenhNhan        AS MA_BN
          ,DM_BenhNhan.HoLotBenhNhan+' '+DM_BenhNhan.TenBenhNhan AS HO_TEN
          ,ISNULL(
               DM_BenhNhan.NgayThangNamSinh
              ,CAST(CAST(DM_BenhNhan.NamSinh AS VARCHAR(4))+'0101' AS DATETIME)
           )                                NGAY_SINH
          ,CASE 
                WHEN DM_BenhNhan.GioiTinh=1 THEN 2
                ELSE 1
           END                              GIOI_TINH
          ,GD2_DM_TheBHYT.DiaChiTheBHYT  AS DIA_CHI
          ,GD2_DM_TheBHYT.SoThe          AS MA_THE
          ,GD2_DM_TheBHYT.Ma_KCB_BanDau  AS MA_DKBD
          ,GD2_DM_TheBHYT.HanSD_TuNgay   AS GT_THE_TU
          ,GD2_DM_TheBHYT.HanSD_DenNgay  AS GT_THE_DEN
          ,''                            AS MIEN_CUNG_CT
          ,CASE 
                WHEN gbant.ID_BenhAnNoiTru IS NULL THEN (
                         SELECT STUFF(
                                    (
                                        SELECT N'/'+Kham.ChanDoan
                                        FROM   Kham
                                        WHERE  Kham.ID_LuotKham = @id_luotkham
                                               
                                               
                                               FOR XML PATH(N''), TYPE
                                    ).value('.' ,'nvarchar(max)')
                                   ,1
                                   ,1
                                   ,N''
                                )
                     )
                ELSE gbant.CD_RaVienBenhChinh+'/'+ISNULL(CD_RaVienBenhKemTheo ,'')
           END                              TEN_BENH
          ,CASE 
                WHEN gbant.ID_BenhAnNoiTru IS NULL THEN MaICD10
                ELSE gbant.ICD_RaVienBenhChinh
           END                              MA_BENH
          ,CASE 
                WHEN gbant.ID_BenhAnNoiTru IS NULL THEN ISNULL(
                         (
                             SELECT STUFF(
                                        (
                                            SELECT N';'+ISNULL(Kham.MaICD10 ,'')
                                            FROM   Kham
                                                   JOIN DM_LoaiKham AS dlk
                                                        ON  dlk.ID_LoaiKham = Kham.ID_LoaiKham
                                            WHERE  Kham.ID_LuotKham = @id_luotkham
                                                   AND (Kham.ID_LoaiKham=10516 OR dlk.ID_NhomCLS=20)
                                                   AND Kham.MaICD10 IS NOT NULL
                                                   AND Kham.MaICD10<>''
                                                   AND kham.IsBacSyChinh = 0
                                                   AND ID_TrangThai<>'HuyBo'
                                                       FOR XML PATH(N''), TYPE
                                        ).value('.' ,'nvarchar(max)')
                                       ,1
                                       ,1
                                       ,N''
                                    )
                         )
                        ,''
                     )
                ELSE ISNULL(gbant.ICD_RaVienBenhKemTheo ,'')
           END                              MA_BENHKHAC
           --,CASE WHEN gbant.ID_BenhAnNoiTru IS NULL THEN
           --	(SELECT STUFF(( SELECT N'/' +Kham.ChanDoan
           --             From Kham where Kham.ID_LuotKham=@id_luotkham for xml path(N''), type).value('.', 'nvarchar(max)') , 1, 1, N''))
           --	END MA_BENHKHAC
          ,CASE 
                WHEN TrangThaiKham=1 
                AND GD2_DM_TheBHYT.Ma_KCB_BanDau<>'48-195'
                AND GD2_DM_TheBHYT.Ma_KCB_BanDau<>'48-124'
				AND GD2_DM_TheBHYT.Ma_KCB_BanDau<>'48-076'
				AND GD2_DM_TheBHYT.Ma_KCB_BanDau<>'48-120'
				AND GD2_DM_TheBHYT.Ma_KCB_BanDau<>'48-001'
				AND GD2_DM_TheBHYT.Ma_KCB_BanDau<>'48-002'
				AND GD2_DM_TheBHYT.Ma_KCB_BanDau<>'48-009'
				AND GD2_DM_TheBHYT.Ma_KCB_BanDau<>'48-012'
				AND GD2_DM_TheBHYT.Ma_KCB_BanDau<>'48-014'
				AND GD2_DM_TheBHYT.Ma_KCB_BanDau<>'48-015'
				AND GD2_DM_TheBHYT.Ma_KCB_BanDau<>'48-065'
				AND GD2_DM_TheBHYT.Ma_KCB_BanDau<>'48-006'
				AND GD2_DM_TheBHYT.Ma_KCB_BanDau<>'48-013'
				AND GD2_DM_TheBHYT.Ma_KCB_BanDau<>'48-126'
				AND GD2_DM_TheBHYT.Ma_KCB_BanDau<>'48-017'
				AND GD2_DM_TheBHYT.Ma_KCB_BanDau<>'48-207'

                
                AND LEFT(GD2_DM_TheBHYT.Ma_KCB_BanDau ,2)
                    ='48' THEN 4 --thong tuyen
                WHEN TrangThaiKham=1 AND GD2_DM_TheBHYT.Ma_KCB_BanDau='48-195' THEN 1
                WHEN TrangThaiKham=1 AND GD2_DM_TheBHYT.Ma_KCB_BanDau<>'48-195' AND LEFT(GD2_DM_TheBHYT.Ma_KCB_BanDau ,2)
                    <>'48' THEN 3
                    
               WHEN  
                TrangThaiKham=1 AND 
                (GD2_DM_TheBHYT.Ma_KCB_BanDau='48-124'
				OR GD2_DM_TheBHYT.Ma_KCB_BanDau='48-076'
				OR GD2_DM_TheBHYT.Ma_KCB_BanDau='48-120'
				OR GD2_DM_TheBHYT.Ma_KCB_BanDau='48-001'
				OR GD2_DM_TheBHYT.Ma_KCB_BanDau='48-002'
				OR GD2_DM_TheBHYT.Ma_KCB_BanDau='48-009'
				OR GD2_DM_TheBHYT.Ma_KCB_BanDau='48-012'
				OR GD2_DM_TheBHYT.Ma_KCB_BanDau='48-014'
				OR GD2_DM_TheBHYT.Ma_KCB_BanDau='48-015'
				OR GD2_DM_TheBHYT.Ma_KCB_BanDau='48-065'
				OR GD2_DM_TheBHYT.Ma_KCB_BanDau='48-006'
				OR GD2_DM_TheBHYT.Ma_KCB_BanDau='48-013'
				OR GD2_DM_TheBHYT.Ma_KCB_BanDau='48-126'
				OR GD2_DM_TheBHYT.Ma_KCB_BanDau='48-017'
				OR GD2_DM_TheBHYT.Ma_KCB_BanDau='48-207')
				THEN 3
                WHEN TrangThaiKham=4 THEN 2
                WHEN TrangThaiKham=3 THEN 3
           END                              MA_LYDO_VVIEN
          ,''                            AS MA_NOI_CHUYEN
          ,''                            AS MA_TAI_NAN
          ,GD2_BHYT_Xml.NgayVaoVien      AS NGAY_VAO
          ,GD2_BHYT_Xml.NgayRaVien       AS NGAY_RA
          ,GD2_BHYT_Xml.NgayUpXml        AS NGAYLAP
          ,CASE 
                WHEN gbant.ID_BenhAnNoiTru IS NOT NULL THEN ThongTinLuotKham.TongNgayDieuTri
                ELSE DATEDIFF(DAY ,GD2_BHYT_Xml.NgayVaoVien ,GD2_BHYT_Xml.NgayRaVien)+1
           END                              SO_NGAY_DTRI
          ,CASE 
                WHEN gbant.ID_BenhAnNoiTru IS NULL THEN 2
                ELSE KetQuaDieuTri
           END                              KET_QUA_DTRI
          ,CASE 
                WHEN gbant.ID_BenhAnNoiTru IS NULL THEN 1
                ELSE HinhThucRaVien
           END                              TINH_TRANG_RV
          ,GD2_BHYT_Xml.NgayRaVien       AS NGAY_TTOAN
          ,CAST(
               100-dbo.GD2_BHYTPhanTramCungChiTraByID_LuotKhamAndID_LoaiKham_FixBHYT2015(ThongTinLuotKham.ID_LuotKham ,0) 
               AS FLOAT
           )                             AS MUC_HUONG
          ,CASE 
                WHEN gbant.ID_BenhAnNoiTru IS NULL THEN 2
                ELSE 3
           END                              MA_LOAI_KCB
          ,CASE 
                WHEN gbant.ID_BenhAnNoiTru IS NULL AND ID_PhanLoaiKham=24 THEN 'K02'
                WHEN gbant.ID_BenhAnNoiTru IS NULL AND ID_PhanLoaiKham<>24 THEN 'K01'
                WHEN gbant.ID_BenhAnNoiTru IS NOT NULL AND dpb2.TenPhongBan IS NULL THEN dpb.Makhoa_BHYT
                WHEN gbant.ID_BenhAnNoiTru IS NOT NULL AND dpb2.TenPhongBan IS NOT NULL THEN dpb2.Makhoa_BHYT
           END                              MA_KHOA
          ,TheTrang.CanNang              AS CAN_NANG
          ,GD2_BHYT_Xml.NgayQuyetToan    AS NgayQuyetToan
          -- Hưng bổ sung cột
          ,CASE WHEN gbant.ID_BenhAnNoiTru IS NOT NULL THEN '1' ELSE '0' END Is_NoiTru
          --,ROW_NUMBER() OVER(ORDER BY gbant.ID_BenhAnNoiTru) id
    FROM   ThongTinLuotKham
           LEFT JOIN GD2_BenhAnNoiTru gbant
                ON  gbant.ID_LuotKham = ThongTinLuotKham.ID_LuotKham
           LEFT JOIN DM_BenhNhan
                ON  DM_BenhNhan.ID_BenhNhan = ThongTinLuotKham.ID_BenhNhan
           LEFT JOIN GD2_DM_TheBHYT
                ON  GD2_DM_TheBHYT.ID_The = ThongTinLuotKham.ID_The
           LEFT JOIN GD2_DM_DKKCB_BanDau
                ON  GD2_DM_DKKCB_BanDau.Ma_KCB_BanDau = GD2_DM_TheBHYT.Ma_KCB_BanDau
           LEFT JOIN Kham
                ON  Kham.ID_LuotKham = ThongTinLuotKham.ID_LuotKham
                    AND Kham.IsBacSyChinh = 1
                    AND Kham.ID_TrangThai<>'HuyBo'
           LEFT JOIN GD2_BHYT_Xml
                ON  GD2_BHYT_Xml.ID_LuotKham = ThongTinLuotKham.ID_LuotKham
           OUTER APPLY (
        SELECT TOP 1 gbantk.ID_PhongBan
        FROM   GD2_BenhAnNoiTru_Khoa gbantk
        WHERE  gbantk.ID_BenhAnNoiTru = gbant.ID_BenhAnNoiTru
        ORDER BY
               gbantk.ID_BenhAnNoiTru_Khoa DESC
    )
    GD2_BenhAnNoiTru_Khoa
    
    LEFT JOIN DM_PhongBan dpb
                ON  dpb.ID_PhongBan = GD2_BenhAnNoiTru_Khoa.ID_PhongBan
           LEFT JOIN DM_PhongBan dpb2
                ON  gbant.ID_KhoaDieuTri = dpb2.ID_PhongBan
           OUTER APPLY GD2_NgayGioVaoVienRaVien(@id_luotkham) GD2_NgayGioVaoVienRaVien
    OUTER APPLY (
        SELECT TOP 1*
        FROM   TheTrang tt
        WHERE  ThongTinLuotKham.ID_LuotKham = tt.ID_LuotKham
    )                                       TheTrang
    WHERE  ThongTinLuotKham.ID_LuotKham = @id_luotkham`;
    let data = await this.connection.query(`${stored}`, [idThuTraNo]);
    const mabenhchinh = await this.getBenhChinh(idThuTraNo);
    const mabenhkem = await this.getBenhKem(idThuTraNo);
    data.map((item: any, index: number) => {
      item.id = (index + 1).toString();
      item.MABENHCHINH = mabenhchinh;
      item.MABENHKEM = mabenhkem;
      return item;
    });
    return data;
  }

  async exec_xml_2_thuoc(idThuTraNo: any) {
    let data = await this.connection.query(
      `DECLARE @id_luotkham INT
      DECLARE @id_benhannoitru INT
      DECLARE @id_thutrano INT = @0
      
      DECLARE @isNoiTru INT
      DECLARE @MA_LYDO_VVIEN     INT 
      DECLARE @hangbenhvien      INT=(
                  SELECT HangBenhVienBHYT
                  FROM   GD2_ThongTinBenhVien
              )
      
      DECLARE @phantramtraituyenloaikham_noitru DECIMAL(18 ,4)=ISNULL(
                  (
                      SELECT GD2_BHYT_HangBV_PhanTram.PhanTramBaoHiemTraNoiTru
                      FROM   GD2_BHYT_HangBV_PhanTram
                      WHERE  HangBenhVien = @hangbenhvien
                  )
                 ,0
              )
      
      DECLARE @phantramtraituyenloaikham_ngoaitru DECIMAL(18 ,4)=ISNULL(
                  (
                      SELECT GD2_BHYT_HangBV_PhanTram.PhanTramBaoHiemTraNgoaiTru
                      FROM   GD2_BHYT_HangBV_PhanTram
                      WHERE  HangBenhVien = @hangbenhvien
                  )
                 ,0
              )
      
      SELECT @id_luotkham = ttt.ID_LuotKham
            ,@isNoiTru            = CASE 
                              WHEN gbant.ID_BenhAnNoiTru IS NULL THEN 0
                              ELSE 1
                         END
            ,@MA_LYDO_VVIEN       = ttlk.TrangThaiKham
            ,@id_benhannoitru     = ID_BenhAnNoiTru
      FROM   ThanhToanTong ttt
             JOIN ThongTinLuotKham ttlk
                  ON  ttlk.ID_LuotKham = ttt.ID_LuotKham
             LEFT JOIN GD2_BenhAnNoiTru gbant
                  ON  gbant.ID_LuotKham = ttt.ID_LuotKham
      WHERE  ttt.ID_ThuTraNo = @id_thutrano
      
      
      ;WITH k1 AS(
          SELECT Thu_TraNo_ChiTiet.*
          FROM   Thu_TraNo_ChiTiet
          WHERE  ID_ThuTraNo = @id_thutrano
      )
      ,k5 AS (
          SELECT DonThuocChiTiet.ID_Thuoc  AS id_loai
                ,DM_Thuoc.TenBietDuoc      AS ten
                ,DM_DonViTinh.TenDonViTinh
                ,ISNULL(gdtctmr.GiaBHYT ,DonThuocChiTiet.Gia) AS dongia
                 --,DonThuocChiTiet.GiaCungChiTra
                ,ISNULL(gdtctmr.GiaBHYT ,DonThuocChiTiet.Gia)-gdtctmr.Gia_BHYTchitra AS GiaCungChiTra
                ,SoThuocThucXuat-dbo.[GD2_LaySoLuongThuocTraLaiNoiTru](DonThuocChiTiet.ID_Thuoc ,DonThuocChiTiet.ID_DonThuoc) AS 
                 soluong
                ,MaSoTheoDMBHYT
                ,DM_Thuoc.HamLuong_BHYT    AS HamLuong
                ,DM_Thuoc.SignNumber
                ,MaDuongDung_BHYT          AS MaDD_BHYT
                ,ISNULL(
                     CASE 
                          WHEN DonThuocChiTiet.CachDung='' THEN NULL
                          ELSE DonThuocChiTiet.CachDung
                     END
                    ,dbo.GD2_PhienCachDungThuoc_New(
                         DonThuocChiTiet.LuongThuocDungTrong1Ngay
                        ,DonThuocChiTiet.CachDungLieuDung
                        ,DonThuocChiTiet.ID_Thuoc
                        ,DonThuocChiTiet.ID_DuongDungThuoc
                     )
                 )                         AS CachDung
                -- Hưng sửa và bổ sung 
                ,CASE WHEN gbant.ID_BenhAnNoiTru IS NOT NULL THEN gtdtct.NgayGioHieuLuc ELSE DonThuoc.NgayKeDon END NgayKeDon
                ----------------------
                ,HoatChat_BHYT
                ,GD2_DM_NhomThuocBHYT.Phantram
                ,4                         AS id_nhombhyt
                ,dpb.Makhoa_BHYT
                ,CASE 
			  -- Hưng sửa
					WHEN GD2_BacSiDaiDien_GET.SoChungChiHanhNghe_BacSiLamDaiDien IS NOT NULL THEN GD2_BacSiDaiDien_GET.SoChungChiHanhNghe_BacSiLamDaiDien ELSE DM_NhanVien.SoChungChiHanhNghe
                      --WHEN ISNULL(DM_NhanVien.SoChungChiHanhNghe ,'')<>'' THEN DM_NhanVien.SoChungChiHanhNghe
                      --WHEN ISNULL(DM_NhanVien.SoChungChiHanhNghe ,'')='' THEN 
                      --     GD2_BacSiDaiDien_GET.SoChungChiHanhNghe_BacSiLamDaiDien
			  ----
                 END                          SoChungChiHanhNghe
                ,DM_Thuoc.ThongTinThauBHYT
                ,gdtctmr.Gia_BHYTchitra
                ,DM_NhanVien.NickName
                ,DonThuocChiTiet.ID_DonThuocCT AS id_kham
                ,1 AS IsThuoc
                ,GD2_BacSiDaiDien_GET.Nickname_BacSiLamDaiDien
                ,gdtctmr.T_BNCCT
                ,gdtctmr.MUC_HUONG
                ,gdtctmr.TYLE_TT
                ,gdtctmr.THANH_TIEN
                ,gdtctmr.T_TRANTT
                ,gdtctmr.T_BNTT
                ,gdtctmr.T_BNCCT T_BNCCT_2
                ,gdtctmr.T_BHTT
                
          FROM   DonThuoc
                 LEFT JOIN GD2_BenhAnNoiTru gbant
                      ON  gbant.ID_LuotKham = DonThuoc.ID_LuotKham
                 JOIN k1
                      ON  DonThuoc.ID_DonThuoc = k1.ID_DonThuoc
                 JOIN DonThuocChiTiet
                      ON  DonThuocChiTiet.ID_DonThuoc = DonThuoc.ID_DonThuoc
                 JOIN DM_Thuoc
                      ON  DonThuocChiTiet.ID_Thuoc = DM_Thuoc.ID_Thuoc
                 JOIN DM_DonViTinh
                      ON  DM_Thuoc.ID_DonViTinh = DM_DonViTinh.ID_DonViTinh
                 JOIN DM_DuongDung ddd
                      ON  ddd.ID_DuongDung = DonThuocChiTiet.ID_DuongDungThuoc
                 LEFT JOIN GD2_DM_NhomThuocBHYT
                      ON  GD2_DM_NhomThuocBHYT.ID_NhomThuocBHYT = DM_Thuoc.ID_NhomBHYT
                 LEFT JOIN DM_PhongBan dpb
                      ON  DonThuoc.ID_PhongBan = dpb.ID_PhongBan
                 -- Hưng sửa và bổ sung
                 LEFT JOIN GD2_ToDieuTriChiTiet gtdtct
                      ON  gtdtct.ID_DonThuoc = DonThuoc.ID_DonThuoc
                 LEFT JOIN DM_NhanVien
                      ON  ID_NhanVien = ( CASE WHEN gbant.ID_BenhAnNoiTru IS NOT NULL THEN gtdtct.ID_NguoiHoanTat ELSE DonThuoc.ID_BacSiChoToa END )
                 ----------------------
                 LEFT JOIN Kham
                      ON  Kham.ID_Kham = DonThuoc.ID_Kham
                 LEFT JOIN GD2_DonThuocChiTietMoRong gdtctmr
                      ON  gdtctmr.ID_DonThuocChiTiet = DonThuocChiTiet.ID_DonThuocCT
                 OUTER APPLY dbo.GD2_BacSiDaiDien_GET(
              -- Hưng sửa và bổ sung
              -- DonThuoc.ID_BacSiChoToa
              CASE WHEN gbant.ID_BenhAnNoiTru IS NOT NULL THEN gtdtct.ID_NguoiHoanTat ELSE DonThuoc.ID_BacSiChoToa END
              --,DonThuoc.NgayKeDon
              ,CASE WHEN gbant.ID_BenhAnNoiTru IS NOT NULL THEN gtdtct.NgayGioHieuLuc ELSE DonThuoc.NgayKeDon END
              ----------------------
              ,CASE 
                   WHEN kham.ID_LoaiKham IS NOT NULL THEN kham.ID_LoaiKham
                   ELSE 10346
              END
          )                                   GD2_BacSiDaiDien_GET
          WHERE  (
                     DonThuoc.TrangThaiDonThuoc<>'Cancel'
                     OR TrangThaiDonThuoc IS NULL
                 )
                 AND DonThuocChiTiet.IsBhyt = 1
                 AND DonThuocChiTiet.SoThuocThucXuat<>0
                 AND DonThuoc.ToaChinh = 1
                 AND DM_Thuoc.LaThuoc = 1
      ) 
      ,k13 AS (
          SELECT k5.id_loai
                ,k5.ten
                ,k5.TenDonViTinh        AS TenDonViTinh
                 --,case when Phantram IS null then dongia else   dongia*(isnull(Phantram,100)/100) end dongia
                ,dongia
                ,soluong
                ,NgayKeDon
                ,MaSoTheoDMBHYT
                ,HamLuong
                ,SignNumber
                ,MaDD_BHYT
                ,CachDung
                 --,case when Phantram IS null then GiaCungChiTra else   dongia*(isnull(Phantram,100)/100)-GiaCungChiTra end GiaCungChiTra
                ,GiaCungChiTra
                ,dongia*soluong            --*(isnull(Phantram,100)/100.0) 
                 AS thanhtien
                ,(dongia-GiaCungChiTra)*soluong AS ThanhTienBaoHiem
                ,HoatChat_BHYT
                ,ISNULL(Phantram ,100)     phantramchitra
                 --,100 as phantramchitra
                ,id_nhombhyt
                ,Makhoa_BHYT
                ,SoChungChiHanhNghe
                ,ThongTinThauBHYT
                ,NickName
                ,ID_Kham
                ,1                      AS IsThuoc
                ,Nickname_BacSiLamDaiDien
                ,T_BNCCT
                ,Gia_BHYTchitra
                ,k5.MUC_HUONG
                ,k5.TYLE_TT
                ,k5.THANH_TIEN
                ,k5.T_TRANTT
                ,k5.T_BNTT
                ,k5.T_BNCCT_2
                ,k5.T_BHTT
          FROM   k5
      )
      ,mau AS 
      (
          SELECT DM_LoaiKham.ID_LoaiKham
                ,TenBHYT
                ,N'Bịch'             AS TenDonViTinh
                ,Kham.GiaBaoHiem
                ,1                   AS soluong
                ,GD2_ToDieuTriChiTiet.NgayGioHieuLuc
                ,MaSoTheoDVBHYT
                ,DM_LoaiKham.GhiChu  AS hamluong
                ,STT_BHYT            AS singnumber
                ,'2.10'              AS madd_bhyt
                ,''                  AS cachdung
                ,Kham.GiaBaoHiem-Kham.ThanhTienBaoHiem AS GiaCungChiTra
                ,Kham.GiaBaoHiem     AS thanhtien
                ,Kham.ThanhTienBaoHiem
                ,''                  AS HoatChat_BHYT
                ,100                 AS phantramchitra
                ,gdb.ID_BHYT         AS id_nhombhyt
                ,''                  AS Makhoa_BHYT
                ,CASE 
                      WHEN DM_NhanVien.SoChungChiHanhNghe IS NULL
          OR DM_NhanVien.SoChungChiHanhNghe='' THEN GD2_BacSiDaiDien_GET.SoChungChiHanhNghe_BacSiLamDaiDien 
             ELSE DM_NhanVien.SoChungChiHanhNghe END SoChungChiHanhNghe
         ,'' AS ThongTinThauBHYT
         ,NickName
         ,GD2_ToDieuTriChiTiet.ID_NguoiHoanTat AS ID_Kham
         ,0 AS IsThuoc
         ,GD2_BacSiDaiDien_GET.Nickname_BacSiLamDaiDien
         ,GD2_CanLamSang_BHYT.T_BNCCT AS T_BNCCT
         ,0 AS Gia_BHYTchitra
         ,GD2_CanLamSang_BHYT.MUC_HUONG
         ,GD2_CanLamSang_BHYT.TYLE_TT
         ,GD2_CanLamSang_BHYT.THANH_TIEN
         ,NULL T_TRANTT
         ,GD2_CanLamSang_BHYT.T_BNTT T_BNTT
         ,GD2_CanLamSang_BHYT.T_BNCCT T_BNCCT_2
         ,NULL T_BHTT
          
          FROM Kham
          LEFT JOIN GD2_CanLamSang_BHYT ON Kham.ID_Kham=GD2_CanLamSang_BHYT.ID_Kham
          JOIN DM_LoaiKham ON Kham.ID_LoaiKham=DM_LoaiKham.ID_LoaiKham
          JOIN GD2_DMNHOM_BHYT gdb ON gdb.ID_Nhom_BHYT=DM_LoaiKham.ID_Nhom_BHYT
          JOIN GD2_ToDieuTriChiTietKham ON GD2_ToDieuTriChiTietKham.Id_Kham=Kham.Id_Kham
          JOIN GD2_ToDieuTriChiTiet ON GD2_ToDieuTriChiTiet.ID_ToDieuTriChiTiet=
          GD2_ToDieuTriChiTietKham.ID_ToDieuTriChiTiet
          LEFT JOIN HuyChiDinhChiTiet ON HuyChiDinhChiTiet.Id_Kham=Kham.Id_Kham
          LEFT JOIN DM_NhanVien ON DM_NhanVien.ID_NhanVien=GD2_ToDieuTriChiTiet.ID_NguoiHoanTat
          OUTER APPLY dbo.GD2_BacSiDaiDien_GET(
              GD2_ToDieuTriChiTiet.ID_NguoiHoanTat
             ,GD2_ToDieuTriChiTiet.NgayGioHieuLuc
             ,10346
          )GD2_BacSiDaiDien_GET
          WHERE ID_LuotKham=@id_luotkham
          AND gdb.ID_BHYT=7
          AND HuyChiDinhChiTiet.ID_Kham IS NULL
          AND Kham.Isbhyt=1
          AND (Kham.ID_TrangThai<>'HuyBo' OR Kham.ID_TrangThai IS NULL)
      ) 
      ,oxi AS 
      (
          SELECT DM_LoaiKham.ID_LoaiKham
                ,TenBHYT
                ,N'Bịch'             AS TenDonViTinh
                ,dtph.GiaBaoHiem
                ,(dtph.SoLanThucHienTrongNgay*dtph.SoNgayThucHien)-ISNULL(HuyChiDinhChiTiet.SoLanTraLai ,0) AS soluong
                ,ISNULL(GD2_ToDieuTriChiTiet.NgayGioHieuLuc ,dtph.NgayGioTao)NgayGioHieuLuc
                ,MaSoTheoDVBHYT
                ,DM_LoaiKham.GhiChu  AS hamluong
                ,STT_BHYT            AS singnumber
                ,''                  AS madd_bhyt
                ,''                  AS cachdung
                ,(
                     (dtph.SoLanThucHienTrongNgay*dtph.SoNgayThucHien)-ISNULL(HuyChiDinhChiTiet.SoLanTraLai ,0)
                 )*dtph.GiaBaoHiem-dtph.ThanhTienBaoHiem AS GiaCungChiTra
                ,(
                     (dtph.SoLanThucHienTrongNgay*dtph.SoNgayThucHien)-ISNULL(HuyChiDinhChiTiet.SoLanTraLai ,0)
                 )*dtph.GiaBaoHiem   AS thanhtien
                ,dtph.ThanhTienBaoHiem
                ,''                  AS HoatChat_BHYT
                ,100                 AS phantramchitra
                ,4                   AS id_nhombhyt
                ,''                  AS Makhoa_BHYT
                ,nv1.SoChungChiHanhNghe
                ,LoiKhuyen           AS ThongTinThauBHYT
                ,nv1.NickName
                ,CASE 
                      WHEN kham.ID_LoaiKham IS NOT NULL THEN kham.ID_Kham
                      ELSE 10346
                 END                    ID_Kham
                ,0                   AS IsThuoc
                ,GD2_BacSiDaiDien_GET.Nickname_BacSiLamDaiDien
                ,GD2_CanLamSang_BHYT.T_BNCCT    AS T_BNCCT
                ,0                   AS Gia_BHYTchitra
                ,GD2_CanLamSang_BHYT.MUC_HUONG
                ,GD2_CanLamSang_BHYT.TYLE_TT
                ,GD2_CanLamSang_BHYT.THANH_TIEN
                ,NULL                   T_TRANTT
                ,GD2_CanLamSang_BHYT.T_BNTT T_BNTT
                ,GD2_CanLamSang_BHYT.T_BNCCT T_BNCCT_2
                ,NULL T_BHTT
          FROM   Kham
                 JOIN DieuTriPhoiHop dtph
                      ON  dtph.ID_Kham = Kham.ID_Kham
                 LEFT JOIN GD2_CanLamSang_BHYT
                      ON  dtph.ID_DieuTriPhoiHop = GD2_CanLamSang_BHYT.ID_DieuTriPhoiHop
                 JOIN DM_LoaiKham
                      ON  dtph.ID_LoaiKham = DM_LoaiKham.ID_LoaiKham
                 JOIN GD2_DMNHOM_BHYT gdb
                      ON  gdb.ID_Nhom_BHYT = DM_LoaiKham.ID_Nhom_BHYT
                 LEFT JOIN GD2_ToDieuTriChiTietKham
                      ON  GD2_ToDieuTriChiTietKham.ID_DieuTriPhoiHop = dtph.ID_DieuTriPhoiHop
                 LEFT JOIN GD2_ToDieuTriChiTiet
                      ON  GD2_ToDieuTriChiTiet.ID_ToDieuTriChiTiet = GD2_ToDieuTriChiTietKham.ID_ToDieuTriChiTiet
                 LEFT JOIN HuyChiDinhChiTiet
                      ON  HuyChiDinhChiTiet.ID_DieuTriPhoiHop = dtph.ID_DieuTriPhoiHop
                 LEFT JOIN DM_NhanVien
                      ON  DM_NhanVien.ID_NhanVien = GD2_ToDieuTriChiTiet.ID_NguoiHoanTat
                 LEFT JOIN DM_NhanVien nv1
                      ON  nv1.ID_NhanVien = dtph.ID_BacSiChanDoan
                 OUTER APPLY dbo.GD2_BacSiDaiDien_GET(
              CASE 
                   WHEN @id_benhannoitru IS NOT NULL THEN GD2_ToDieuTriChiTiet.ID_NguoiHoanTat
                   ELSE dtph.ID_BacSiChanDoan
              END
             ,CASE 
                   WHEN @id_benhannoitru IS NOT NULL THEN GD2_ToDieuTriChiTiet.NgayGioHieuLuc
                   ELSE dtph.NgayGioTao
              END
             ,CASE 
                   WHEN @id_benhannoitru IS NOT NULL THEN 10346
                   ELSE DM_LoaiKham.ID_LoaiKham
              END
          )                             GD2_BacSiDaiDien_GET
          WHERE  ID_LuotKham = @id_luotkham
                 AND gdb.ID_BHYT = 4
                 AND HuyChiDinhChiTiet.ID_Kham IS NULL
                 AND dtph.Isbhyt = 1
                 AND (kham.ExtField1='DieuTriPhoiHop')
                 AND (dtph.ID_TrangThai<>'HuyBo' OR dtph.ID_TrangThai IS NULL)
      ) 
      
      ,THuoc_kham AS 
      (
          SELECT DM_LoaiKham.ID_LoaiKham
                ,TenBHYT
                ,N'Lọ'                   AS TenDonViTinh
                ,Kham.GiaBaoHiem
                ,1                       AS soluong
                ,ISNULL(GD2_ToDieuTriChiTiet.NgayGioHieuLuc ,Kham.NgayGioTao)NgayGioHieuLuc
                ,MaSoTheoDVBHYT
                ,DM_LoaiKham.GhiChu      AS hamluong
                ,STT_BHYT                AS singnumber
                ,'2.10'                  AS madd_bhyt
                ,DM_LoaiKham.ReportName  AS cachdung
                ,Kham.GiaBaoHiem-Kham.ThanhTienBaoHiem AS GiaCungChiTra
                ,Kham.GiaBaoHiem         AS thanhtien
                ,CASE 
                      WHEN DM_LoaiKham.ID_LoaiKham=10718
          AND @id_thutrano=2680411 THEN 230422.5
              WHEN DM_LoaiKham.ID_LoaiKham=10718
          AND @id_thutrano=2647166 THEN 230422.5 
              WHEN DM_LoaiKham.ID_LoaiKham=10718
          AND @id_thutrano=2724337 THEN 230422.5 
              WHEN DM_LoaiKham.ID_LoaiKham=10718
          AND @id_thutrano=2733264 THEN 230422.5 
              WHEN DM_LoaiKham.ID_LoaiKham=10718
          AND @id_thutrano=2735929 THEN 230422.5 
              WHEN DM_LoaiKham.ID_LoaiKham=10718
          AND @id_thutrano=2733284 THEN 230422.5 
              WHEN DM_LoaiKham.ID_LoaiKham=10718
          AND @id_thutrano=2706601 THEN 230422.5 
              WHEN DM_LoaiKham.ID_LoaiKham=10718
          AND @id_thutrano=2702683 THEN 230422.5 
              
              
              
              
              
              
              ELSE Kham.ThanhTienBaoHiem 
              END ThanhTienBaoHiem
         ,'' AS HoatChat_BHYT
         ,100 AS phantramchitra
         ,4 AS id_nhombhyt
         ,'' AS Makhoa_BHYT
          --,nv1.SoChungChiHanhNghe
         ,GD2_BacSiDaiDien_GET.SoChungChiHanhNghe_BacSiLamDaiDien
          --,case when isnull(DM_NhanVien.SoChungChiHanhNghe,'')<>''  then DM_NhanVien.SoChungChiHanhNghe
          --     when isnull(DM_NhanVien.SoChungChiHanhNghe,'')='' then GD2_BacSiDaiDien_GET.SoChungChiHanhNghe_BacSiLamDaiDien end SoChungChiHanhNghe
         ,LoiKhuyen AS ThongTinThauBHYT
         ,nv1.NickName
         ,CASE 
               WHEN kham.ID_LoaiKham IS NOT NULL THEN kham.ID_Kham
               ELSE 10346
          END ID_Kham
         ,1 AS IsThuoc
         ,GD2_BacSiDaiDien_GET.Nickname_BacSiLamDaiDien
         ,Kham.GiaBaoHiem-ThanhTienBaoHiem AS T_BNCCT
         ,0 AS Gia_BHYTchitra
         ,GD2_CanLamSang_BHYT.MUC_HUONG
         ,GD2_CanLamSang_BHYT.TYLE_TT
         ,GD2_CanLamSang_BHYT.THANH_TIEN
         ,NULL T_TRANTT
         ,GD2_CanLamSang_BHYT.T_BNTT T_BNTT
         ,GD2_CanLamSang_BHYT.T_BNCCT T_BNCCT_2
         ,NULL T_BHTT
          
          FROM Kham
          LEFT JOIN GD2_CanLamSang_BHYT ON Kham.ID_Kham=GD2_CanLamSang_BHYT.ID_Kham
          JOIN DM_LoaiKham ON Kham.ID_LoaiKham=DM_LoaiKham.ID_LoaiKham
          JOIN GD2_DMNHOM_BHYT gdb ON gdb.ID_Nhom_BHYT=DM_LoaiKham.ID_Nhom_BHYT
          LEFT JOIN GD2_ToDieuTriChiTietKham ON GD2_ToDieuTriChiTietKham.ID_DieuTriPhoiHop=Kham.ID_Kham
          LEFT JOIN GD2_ToDieuTriChiTiet ON GD2_ToDieuTriChiTiet.ID_ToDieuTriChiTiet=
          GD2_ToDieuTriChiTietKham.ID_ToDieuTriChiTiet
          LEFT JOIN HuyChiDinhChiTiet ON HuyChiDinhChiTiet.ID_DieuTriPhoiHop=Kham.ID_Kham
          LEFT JOIN DM_NhanVien ON DM_NhanVien.ID_NhanVien=GD2_ToDieuTriChiTiet.ID_NguoiHoanTat
          LEFT JOIN DM_NhanVien nv1 ON nv1.ID_NhanVien=Kham.BSChiDinh
          OUTER APPLY dbo.GD2_BacSiDaiDien_GET(
              CASE 
                   WHEN @id_benhannoitru IS NOT NULL THEN GD2_ToDieuTriChiTiet.ID_NguoiHoanTat
                   ELSE Kham.BSChiDinh
              END
             ,CASE 
                   WHEN @id_benhannoitru IS NOT NULL THEN GD2_ToDieuTriChiTiet.NgayGioHieuLuc
                   ELSE Kham.NgayGioTao
              END
             ,CASE 
                   WHEN @id_benhannoitru IS NOT NULL THEN 10346
                   ELSE DM_LoaiKham.ID_LoaiKham
              END
          )GD2_BacSiDaiDien_GET
          
          
          WHERE ID_LuotKham=@id_luotkham
          AND gdb.ID_BHYT=4
          AND HuyChiDinhChiTiet.ID_Kham IS NULL
          AND Kham.Isbhyt=1
              --AND (kham.ExtField1<>'DieuTriPhoiHop')
          AND (Kham.ID_TrangThai<>'HuyBo' OR Kham.ID_TrangThai IS NULL)
      ) 
      ,k14 AS(
          SELECT k13.*
          FROM   k13 
          UNION ALL 
          SELECT *
          FROM   mau 
          UNION ALL 
          SELECT *
          FROM   oxi 
          UNION ALL 
          SELECT *
          FROM   THuoc_kham
      )
      
      --INSERT INTO @Thuoc
      SELECT id_loai id_loai 
  ,ten ten 
  ,TenDonViTinh TenDonViTinh 
  ,dongia dongia 
  ,soluong soluong 
  ,NgayKeDon NgayKeDon 
  ,MaSoTheoDMBHYT MaSoTheoDMBHYT 
  ,HamLuong HamLuong 
  ,SignNumber SignNumber 
  ,MaDD_BHYT MaDD_BHYT 
  ,CachDung CachDung 
  ,GiaCungChiTra GiaCungChiTra 
  ,CASE 
        WHEN THANH_TIEN IS NOT NULL THEN THANH_TIEN
        ELSE thanhtien
  END                     thanhtien 
  ,thanhtien               thanhtien_2 
  ,CONVERT(DECIMAL(18 ,2) ,ThanhTienBaoHiem)ThanhTienBaoHiem 
  ,HoatChat_BHYT HoatChat_BHYT 
  ,phantramchitra phantramchitra 
  ,id_nhombhyt id_nhombhyt 
  ,Makhoa_BHYT Makhoa_BHYT 
  ,SoChungChiHanhNghe SoChungChiHanhNghe 
  ,ThongTinThauBHYT ThongTinThauBHYT 
  ,NickName NickName 
  ,ID_Kham
  --,((ThanhTienBaoHiem/phantramchitra)*100.00)/(dongia*soluong)*100 AS MUC_HUONG ID_Kham 
  ,CASE 
        WHEN MUC_HUONG IS NOT NULL THEN MUC_HUONG
        ELSE ((ThanhTienBaoHiem/phantramchitra)*100.00)/(dongia*soluong)*100
  END                     MUC_HUONG 
  ,CASE 
        WHEN TYLE_TT IS NOT NULL THEN TYLE_TT
        ELSE phantramchitra
  END                     TYLE_TT 
  ,CASE 
        WHEN T_TRANTT IS NOT NULL THEN T_TRANTT
        ELSE thanhtien
  END                    T_TRANTT
  --,CONVERT(DECIMAL(18 ,2) ,ThanhTienBaoHiem) AS T_BHTT T_TRANTT 
  ,CASE 
  WHEN T_BHTT IS NOT NULL THEN T_BHTT ELSE CONVERT(DECIMAL(18 ,2) ,ThanhTienBaoHiem)
  END  T_BHTT 
  ,Makhoa_BHYT         AS  MA_KHOA 
  ,SoChungChiHanhNghe  AS  MA_BAC_SI 
  ,ThongTinThauBHYT    AS  TT_THAU 
  ,CASE 
        WHEN id_loai=4881 AND @id_thutrano=2047144 THEN 455000.000
        WHEN id_loai=4881 AND @id_thutrano=2133167 THEN 455000.000
        WHEN id_loai=4881 AND @id_thutrano=2165147 THEN 455000.0000
        WHEN id_loai=4881 AND @id_thutrano=2135342 THEN 455000.0000
        WHEN id_loai=4881 AND @id_thutrano=2225883 THEN 455000.0000
        WHEN phantramchitra=100 AND @MA_LYDO_VVIEN=3 AND @isNoiTru=1 THEN thanhtien*((100.0-@phantramtraituyenloaikham_noitru)/100.0)
        WHEN phantramchitra=100 AND @MA_LYDO_VVIEN=3 AND @isNoiTru=0 THEN thanhtien*((100.0-@phantramtraituyenloaikham_ngoaitru)/100.0) --không có trường hợp này
        WHEN phantramchitra<>100 AND @MA_LYDO_VVIEN<>3 THEN thanhtien*((100.0-phantramchitra)/100.0)
        WHEN phantramchitra<>100 AND @MA_LYDO_VVIEN=3 THEN thanhtien-ThanhTienBaoHiem
            
            --WHEN ThanhTienBaoHiem/(dongia*soluong)*100<>100 THEN thanhtien*((100.0-@phantramtraituyenloaikham_ngoaitru)/100.0
        ELSE 0
  END                     T_BNTT 
  ,CASE 
  WHEN T_BNCCT_2 IS NOT NULL THEN T_BNCCT_2 ELSE
  CASE
    WHEN (id_loai=10718) AND @id_thutrano=2680411 THEN 12127.5
    WHEN (id_loai=10718) AND @id_thutrano=2647166 THEN 12127.5
    WHEN (id_loai=10718) AND @id_thutrano=2724337 THEN 12127.5
    WHEN (id_loai=10718) AND @id_thutrano=2733264 THEN 12127.5
    WHEN (id_loai=10718) AND @id_thutrano=2735929 THEN 12127.5
    WHEN (id_loai=10718) AND @id_thutrano=2733284 THEN 12127.5
    WHEN (id_loai=10718) AND @id_thutrano=2706601 THEN 12127.5
    WHEN (id_loai=10718) AND @id_thutrano=2702683 THEN 12127.5
    WHEN (id_loai=10718) THEN thanhtien-CONVERT(DECIMAL(18 ,2) ,ThanhTienBaoHiem)
    WHEN T_BNCCT IS NOT NULL AND (id_loai<>10505) THEN T_BNCCT
    ELSE CASE 
          WHEN id_loai=4881 AND @id_thutrano=2047144 THEN 9750.0000
          WHEN id_loai=4881 AND @id_thutrano=2029771 THEN 65000.0000
          WHEN id_loai=4881 AND @id_thutrano=2012070 THEN 65000.0000
          WHEN id_loai=4881 AND @id_thutrano=1997760 THEN 16250.0000
          WHEN id_loai=4881 AND @id_thutrano=2063503 THEN 65000.0000
          WHEN id_loai=4881 AND @id_thutrano=2121181 THEN 16250.0000
          WHEN id_loai=4881 AND @id_thutrano=2133167 THEN 39000.0000
          WHEN id_loai=4881 AND @id_thutrano=2165147 THEN 39000.0000
          WHEN id_loai=4881 AND @id_thutrano=2135342 THEN 9750.0000
          WHEN id_loai=4881 AND @id_thutrano=2167160 THEN 65000.0000
          WHEN id_loai=4881 AND @id_thutrano=2204891 THEN 65000.0000
          WHEN id_loai=4881 AND @id_thutrano=2149264 THEN 16250.0000
          WHEN id_loai=4881 AND @id_thutrano=2209778 THEN 65000.0000
          WHEN id_loai=4881 AND @id_thutrano=2225883 THEN 39000.0000
          WHEN id_loai=2922 AND @id_thutrano=2299317 THEN 22400.0000
          WHEN id_loai=2922 AND @id_thutrano=2347061 THEN 22400.0000
          WHEN id_loai=4881 AND @id_thutrano=2292471 THEN 65000.0000
          WHEN id_loai=5807 AND @id_thutrano=2393637 THEN 166600.0000
          WHEN id_loai=2922 AND @id_thutrano=2412242 THEN 22400.0000
          WHEN id_loai=2922 AND @id_thutrano=2411996 AND soluong=2 THEN 22400.0000
          WHEN id_loai=2922 AND @id_thutrano=2411996 AND soluong=3 THEN 33600.0000
          WHEN id_loai=2922 AND @id_thutrano=2402443 THEN 22400.0000
          WHEN id_loai=5807 AND @id_thutrano=2409483 THEN 83300.0000
          WHEN id_loai=2922 AND @id_thutrano=2396053 AND soluong=2 THEN 22400.0000
          WHEN id_loai=2922 AND @id_thutrano=2396053 AND soluong=3 THEN 33600.0000
          WHEN id_loai=5807 AND @id_thutrano=2359571 AND soluong=1 THEN 83300.0000
          WHEN id_loai=5807 AND @id_thutrano=2359571 AND soluong=2 THEN 166600.0000
          WHEN id_loai=4881 AND @id_thutrano=2359571 THEN 65000.0000
          WHEN id_loai=2922 AND @id_thutrano=2458191 AND soluong=1 THEN 11200.0000
          WHEN id_loai=2922 AND @id_thutrano=2458191 AND soluong=3 THEN 33600.0000
          WHEN id_loai=2922 AND @id_thutrano=2460644 THEN 22400.0000
          WHEN id_loai=2922 AND @id_thutrano=2461058 THEN 5600.0000
          WHEN id_loai=2922 AND @id_thutrano=2459671 THEN 22400.0000
          WHEN id_loai=2922 AND @id_thutrano=2463648 AND soluong=1 THEN 11200.0000
          WHEN id_loai=2922 AND @id_thutrano=2463648 AND soluong=2 THEN 22400.0000
          WHEN id_loai=2922 AND @id_thutrano=2458191 AND soluong=3 THEN 22400.0000
          WHEN id_loai=2922 AND @id_thutrano=2458191 AND soluong=1 THEN 22400.0000
          WHEN id_loai=2922 AND @id_thutrano=2459671 AND soluong=2 THEN 22400.0000
          WHEN id_loai=2922 AND @id_thutrano=2461058 AND soluong=2 THEN 22400.0000
          WHEN id_loai=2922 AND @id_thutrano=2460164 AND soluong=3 THEN 33600.0000
          WHEN id_loai=2922 AND @id_thutrano=2460644 AND soluong=2 THEN 22400.0000
          WHEN id_loai=2922 AND @id_thutrano=2426439 AND soluong=3 THEN 33600.0000
          WHEN id_loai=2922 AND @id_thutrano=2426439 AND soluong=1 THEN 11200.0000
          WHEN id_loai=2922 AND @id_thutrano=2454078 AND soluong=2 THEN 22400.0000
          WHEN id_loai=2922 AND @id_thutrano=2445310 AND soluong=2 THEN 22400.0000
          WHEN id_loai=2922 AND @id_thutrano=2463648 AND soluong=2 THEN 22400.0000
          WHEN id_loai=2922 AND @id_thutrano=2463648 AND soluong=1 THEN 11200.0000
          WHEN id_loai=2922 AND @id_thutrano=2458191 AND soluong=1 THEN 11200.0000
          WHEN id_loai=2922 AND @id_thutrano=2458191 AND soluong=2 THEN 22400.0000
          WHEN id_loai=2922 AND @id_thutrano=2415440 AND soluong=2 THEN 22400.0000
          WHEN id_loai=2922 AND @id_thutrano=2413851 AND soluong=2 THEN 22400.0000
          WHEN id_loai=5807 AND @id_thutrano=2413851 AND soluong=2 THEN 166600.0000
          WHEN id_loai=5807 AND @id_thutrano=2413851 AND soluong=2 THEN 166600.0000
          WHEN id_loai=2922 AND @id_thutrano=2526240 AND soluong=2 THEN 18501.0000
          WHEN id_loai=2922 AND @id_thutrano=2526240 AND soluong=3 THEN 27751.5000
          WHEN id_loai=2922 AND @id_thutrano=2535882 AND soluong=1 THEN 9250.5000
          WHEN id_loai=2922 AND @id_thutrano=2535882 AND soluong=2 THEN 18501.0000
          WHEN id_loai=2922 AND @id_thutrano=2535882 AND soluong=3 THEN 27751.5000
          WHEN id_loai=2922 AND @id_thutrano=2523620 AND soluong=2 THEN 18501.0000
          WHEN id_loai=2922 AND @id_thutrano=2526240 AND soluong=2 THEN 18501.0000
          WHEN id_loai=2922 AND @id_thutrano=2526240 AND soluong=3 THEN 27751.5000
          WHEN id_loai=2922 AND @id_thutrano=2535882 AND soluong=1 THEN 9250.5000
          WHEN id_loai=2922 AND @id_thutrano=2535882 AND soluong=2 THEN 18501.0000
          WHEN id_loai=2922 AND @id_thutrano=2535882 AND soluong=3 THEN 27751.5000
          WHEN id_loai=2922 AND @id_thutrano=2490811 AND soluong=1 THEN 9250.5000
          WHEN id_loai=2922 AND @id_thutrano=2490811 AND soluong=2 THEN 18501.0000
          WHEN id_loai=2922 AND @id_thutrano=2490811 AND soluong=3 THEN 27751.5000
          WHEN id_loai=2922 AND @id_thutrano=2489444 AND soluong=1 THEN 9250.5000
          WHEN id_loai=2922 AND @id_thutrano=2489444 AND soluong=2 THEN 18501.0000
          WHEN id_loai=2922 AND @id_thutrano=2489444 AND soluong=3 THEN 27751.5000
          WHEN id_loai=2922 AND @id_thutrano=2523604 AND soluong=1 THEN 9250.5000
          WHEN id_loai=2922 AND @id_thutrano=2523604 AND soluong=2 THEN 18501.0000
          WHEN id_loai=2922 AND @id_thutrano=2523604 AND soluong=3 THEN 27751.5000
          WHEN id_loai=2922 AND @id_thutrano=2468189 AND soluong=1 THEN 9250.5000
          WHEN id_loai=2922 AND @id_thutrano=2468189 AND soluong=2 THEN 18501.0000
          WHEN id_loai=2922 AND @id_thutrano=2468189 AND soluong=3 THEN 27751.5000
          WHEN id_loai=2922 AND @id_thutrano=2536863 AND soluong=1 THEN 9250.5000
          WHEN id_loai=2922 AND @id_thutrano=2536863 AND soluong=2 THEN 18501.0000
          WHEN id_loai=2922 AND @id_thutrano=2536863 AND soluong=3 THEN 27751.5000
          WHEN id_loai=2922 AND @id_thutrano=2526240 AND soluong=1 THEN 9250.5000
          WHEN id_loai=2922 AND @id_thutrano=2526240 AND soluong=2 THEN 18501.0000
          WHEN id_loai=2922 AND @id_thutrano=2526240 AND soluong=3 THEN 27751.5000
          WHEN id_loai=2922 AND @id_thutrano=2535882 AND soluong=1 THEN 9250.5000
          WHEN id_loai=2922 AND @id_thutrano=2535882 AND soluong=2 THEN 18501.0000
          WHEN id_loai=2922 AND @id_thutrano=2535882 AND soluong=3 THEN 27751.5000
          WHEN id_loai=2922 AND @id_thutrano=2490811 AND soluong=1 THEN 9250.5000
          WHEN id_loai=2922 AND @id_thutrano=2490811 AND soluong=2 THEN 18501.0000
          WHEN id_loai=2922 AND @id_thutrano=2490811 AND soluong=3 THEN 27751.5000
          WHEN id_loai=2922 AND @id_thutrano=2489444 AND soluong=1 THEN 9250.5000
          WHEN id_loai=2922 AND @id_thutrano=2489444 AND soluong=2 THEN 18501.0000
          WHEN id_loai=2922 AND @id_thutrano=2489444 AND soluong=3 THEN 27751.5000
          WHEN id_loai=2922 AND @id_thutrano=2523620 AND soluong=1 THEN 9250.5000
          WHEN id_loai=2922 AND @id_thutrano=2523620 AND soluong=2 THEN 18501.0000
          WHEN id_loai=2922 AND @id_thutrano=2523620 AND soluong=3 THEN 27751.5000
          WHEN id_loai=2922 AND @id_thutrano=2523604 AND soluong=1 THEN 9250.5000
          WHEN id_loai=2922 AND @id_thutrano=2523604 AND soluong=2 THEN 18501.0000
          WHEN id_loai=2922 AND @id_thutrano=2523604 AND soluong=3 THEN 27751.5000
          WHEN id_loai=2922 AND @id_thutrano=2468189 AND soluong=1 THEN 9250.5000
          WHEN id_loai=2922 AND @id_thutrano=2468189 AND soluong=2 THEN 18501.0000
          WHEN id_loai=2922 AND @id_thutrano=2468189 AND soluong=3 THEN 27751.5000
          WHEN id_loai=2922 AND @id_thutrano=2536863 AND soluong=1 THEN 9250.5000
          WHEN id_loai=2922 AND @id_thutrano=2536863 AND soluong=2 THEN 18501.0000
          WHEN id_loai=2922 AND @id_thutrano=2536863 AND soluong=3 THEN 27751.5000
          WHEN phantramchitra=100 AND @MA_LYDO_VVIEN=3 AND @isNoiTru=1 THEN thanhtien*(@phantramtraituyenloaikham_noitru/100.00)
            -ThanhTienBaoHiem
          WHEN phantramchitra=80 AND @MA_LYDO_VVIEN=3 AND @isNoiTru=1 THEN thanhtien*(@phantramtraituyenloaikham_noitru/100.00)
            -ThanhTienBaoHiem
          WHEN phantramchitra=100 AND @MA_LYDO_VVIEN=3 AND @isNoiTru=0 THEN thanhtien*(@phantramtraituyenloaikham_ngoaitru/100.00)
            -ThanhTienBaoHiem --không có trường hợp này
          WHEN phantramchitra<>100 AND @MA_LYDO_VVIEN<>3 THEN 0.000
          WHEN phantramchitra<>100 AND @MA_LYDO_VVIEN=3 THEN 0
          ELSE thanhtien*1.000-ThanhTienBaoHiem*1.000
        END
      END
  END                     T_BNCCT 
  ,IsThuoc IsThuoc 
  ,Nickname_BacSiLamDaiDien Nickname_BacSiLamDaiDien 
  ,T_BNCCT T_BNCCTam 
  ,Gia_BHYTchitra Gia_BHYTchitra 
  ,MUC_HUONG               MUC_HUONG_2 
  ,TYLE_TT                 TYLE_TT_2 
  ,THANH_TIEN              THANH_TIEN_2 
  ,T_TRANTT               T_TRANTT_2 
  ,T_BNTT   T_BNTT_2 
  ,T_BNCCT_2 T_BNCCT_2 
  ,T_BHTT T_BHTT_2
      FROM   k14
      WHERE  soluong<>0`,
      [idThuTraNo],
    );
    const mabenhchinh = await this.getBenhChinh(idThuTraNo);
    const mabenhkem = await this.getBenhKem(idThuTraNo);
    data.map((item: any, index: number) => {
      item.id = (index + 1).toString();
      item.MABENHCHINH = mabenhchinh;
      item.MABENHKEM = mabenhkem;
      return item;
    });
    return data;
  }

  async exec_xml_3_canlamsang(idThuTraNo: any) {
    let stored = `DECLARE @id_luotkham INT
    DECLARE @isNoiTru INT
    DECLARE @MA_LYDO_VVIEN     INT 
    DECLARE @hangbenhvien      INT=(
                SELECT HangBenhVienBHYT
                FROM   GD2_ThongTinBenhVien
    )
    
    DECLARE @phantramtraituyenloaikham_noitru DECIMAL(18 ,4)=ISNULL(
                (
                    SELECT GD2_BHYT_HangBV_PhanTram.PhanTramBaoHiemTraNoiTru
                    FROM   GD2_BHYT_HangBV_PhanTram
                    WHERE  HangBenhVien = @hangbenhvien
                )
               ,0
            )
    
    DECLARE @phantramtraituyenloaikham_ngoaitru DECIMAL(18 ,4)=ISNULL(
                (
                    SELECT GD2_BHYT_HangBV_PhanTram.PhanTramBaoHiemTraNgoaiTru
                    FROM   GD2_BHYT_HangBV_PhanTram
                    WHERE  HangBenhVien = @hangbenhvien
                )
               ,0
            )
    
    
    SELECT @id_luotkham = ttt.ID_LuotKham
          ,@isNoiTru          = CASE 
                            WHEN gbant.ID_BenhAnNoiTru IS NULL THEN 0
                            ELSE 1
                       END
          ,@MA_LYDO_VVIEN     = ttlk.TrangThaiKham
    FROM   ThanhToanTong ttt
           JOIN ThongTinLuotKham ttlk
                ON  ttlk.ID_LuotKham = ttt.ID_LuotKham
           LEFT JOIN GD2_BenhAnNoiTru gbant
                ON  gbant.ID_LuotKham = ttt.ID_LuotKham
    WHERE  ttt.ID_ThuTraNo = @0
    
    
    
    ;WITH k1 AS(
        SELECT Thu_TraNo_ChiTiet.*
        FROM   Thu_TraNo_ChiTiet
        WHERE  ID_ThuTraNo = @0
    )
    ,k2 AS(
        SELECT Kham.ID_LoaiKham
              ,GiaBaoHiem
              ,CONVERT(DECIMAL(18 ,2) ,Kham.ThanhTienBaoHiem)ThanhTienBaoHiem
              ,1                AS soluong
              ,kham.NgayGioTao  AS NgayGio
              ,ThanhTienBaoHiem/GiaBaoHiem AS MUC_HUONG
              ,CASE 
                    WHEN GD2_BacSiDaiDien_GET.SoChungChiHanhNghe_BacSiLamDaiDien IS NOT NULL THEN 
                         GD2_BacSiDaiDien_GET.SoChungChiHanhNghe_BacSiLamDaiDien
                    ELSE dnv.SoChungChiHanhNghe
               END                 SoChungChiHanhNghe
              ,NULL             AS GiaCungChiTra
              ,kham.ID_Kham
              ,dnv.NickName
              ,GD2_BacSiDaiDien_GET.Nickname_BacSiLamDaiDien
              ,GD2_CanLamSang_BHYT.MUC_HUONG MUC_HUONG_2
              ,GD2_CanLamSang_BHYT.TYLE_TT
              ,GD2_CanLamSang_BHYT.THANH_TIEN
              ,NULL T_TRANTT
              ,GD2_CanLamSang_BHYT.T_BNTT T_BNTT
              ,GD2_CanLamSang_BHYT.T_BNCCT T_BNCCT
              ,NULL Gia_BHYTchitra
              ,NULL T_BHTT
        FROM   k1
               LEFT JOIN Kham
                    ON  k1.ID_Kham = Kham.ID_Kham
               LEFT JOIN GD2_CanLamSang_BHYT
                    ON  GD2_CanLamSang_BHYT.ID_Kham = Kham.ID_Kham
               LEFT JOIN HuyChiDinhChiTiet
                    ON  HuyChiDinhChiTiet.ID_Kham = k1.ID_Kham
               OUTER APPLY dbo.GD2_BacSiDaiDien_GET(
            ISNULL(Kham.BSChanDoan ,Kham.NguoiGioiThieu)
           ,ISNULL(ISNULL(Kham.NgayGioDoc ,NgayGioChanDoan) ,Kham.NgayGioTao)
           ,kham.ID_LoaiKham
        )GD2_BacSiDaiDien_GET
        LEFT JOIN DM_NhanVien dnv
                    ON  ISNULL(Kham.BSChanDoan ,Kham.NguoiGioiThieu) = dnv.ID_NhanVien
        WHERE  k1.ID_DieuTriPhoiHop IS NULL
               AND k1.ID_Physiotherapy IS NULL
               AND ID_DonThuoc IS NULL
               AND Id_BenhAn_DichVu IS NULL
               AND Id_BenhAn_GiuongBenh IS NULL
               AND ID_TrangThai<>'HuyBo'
               AND HuyChiDinhChiTiet.ID_Kham IS NULL
               AND Kham.Isbhyt = 1
    ),
    
    k3 AS (
        SELECT DieuTriPhoiHop.ID_LoaiKham
              ,GiaBaoHiem
              ,(
                   (
                       CONVERT(DECIMAL(18 ,2) ,DieuTriPhoiHop.ThanhTienBaoHiem)/(SoLanThucHienTrongNgay*SoNgayThucHien)
                   )*NULLIF(
                       (
                           (SoLanThucHienTrongNgay*SoNgayThucHien)-ISNULL(SoLanTraLai ,0)
                       )
                      ,0
                   )
               )     AS ThanhTienBaoHiem
              ,(
                   (SoLanThucHienTrongNgay*SoNgayThucHien)-ISNULL(SoLanTraLai ,0)
               )     AS soluong
              ,DieuTriPhoiHop.NgayGioTao
              ,DieuTriPhoiHop.ThanhTienBaoHiem/(
                   DieuTriPhoiHop.GiaBaoHiem*(SoLanThucHienTrongNgay*SoNgayThucHien)
               )     AS MUC_HUONG
              ,CASE 
                    WHEN GD2_BacSiDaiDien_GET.SoChungChiHanhNghe_BacSiLamDaiDien IS NOT NULL THEN 
                         GD2_BacSiDaiDien_GET.SoChungChiHanhNghe_BacSiLamDaiDien
                    ELSE dnv.SoChungChiHanhNghe
               END      SoChungChiHanhNghe
              ,NULL  AS GiaCungChiTra
              ,DieuTriPhoiHop.ID_DieuTriPhoiHop
              ,dnv.NickName
              ,GD2_BacSiDaiDien_GET.Nickname_BacSiLamDaiDien
              ,GD2_CanLamSang_BHYT.MUC_HUONG MUC_HUONG_2
              ,GD2_CanLamSang_BHYT.TYLE_TT
              ,GD2_CanLamSang_BHYT.THANH_TIEN
              ,NULL     T_TRANTT
              ,GD2_CanLamSang_BHYT.T_BNTT T_BNTT
              ,GD2_CanLamSang_BHYT.T_BNCCT T_BNCCT
              ,NULL Gia_BHYTchitra
              ,NULL T_BHTT
        FROM   k1
               JOIN DieuTriPhoiHop
                    ON  DieuTriPhoiHop.ID_DieuTriPhoiHop = k1.ID_DieuTriPhoiHop
               LEFT JOIN GD2_CanLamSang_BHYT
                    ON  GD2_CanLamSang_BHYT.ID_DieuTriPhoiHop = DieuTriPhoiHop.ID_DieuTriPhoiHop
               LEFT JOIN HuyChiDinhChiTiet
                    ON  HuyChiDinhChiTiet.ID_DieuTriPhoiHop = DieuTriPhoiHop.ID_DieuTriPhoiHop
               LEFT JOIN DM_NhanVien dnv
                    ON  DieuTriPhoiHop.BSChiDinh = dnv.ID_NhanVien
               OUTER APPLY dbo.GD2_BacSiDaiDien_GET(
            DieuTriPhoiHop.BSChiDinh
           ,DieuTriPhoiHop.NgayGioTao
           ,DieuTriPhoiHop.ID_LoaiKham
        )               GD2_BacSiDaiDien_GET
        WHERE  k1.ID_DieuTriPhoiHop IS NOT NULL
               AND ID_TrangThai<>'HuyBo'
               AND DieuTriPhoiHop.Isbhyt = 1
    )
    ,
    k4 AS (
        SELECT PHYSIOTHERAPY.ID_LoaiKham
              ,GiaBaoHiem
              ,(
                   (
                       CONVERT(DECIMAL(18 ,2) ,PHYSIOTHERAPY.ThanhTienBaoHiem)/(SoLanThucHienTrongNgay*SoNgayThucHien)
                   )*NULLIF(
                       (
                           (SoLanThucHienTrongNgay*SoNgayThucHien)-ISNULL(SoLanTraLai ,0)
                       )
                      ,0
                   )
               )     AS ThanhTienBaoHiem
              ,(SoLanThucHienTrongNgay*SoNgayThucHien)-ISNULL(SoLanTraLai ,0) AS soluong
              ,PHYSIOTHERAPY.NgayGioTao
              ,PHYSIOTHERAPY.ThanhTienBaoHiem/(
                   PHYSIOTHERAPY.GiaBaoHiem*(SoLanThucHienTrongNgay*SoNgayThucHien)
               )     AS MUC_HUONG
              ,CASE 
                    WHEN GD2_BacSiDaiDien_GET.SoChungChiHanhNghe_BacSiLamDaiDien IS NOT NULL THEN 
                         GD2_BacSiDaiDien_GET.SoChungChiHanhNghe_BacSiLamDaiDien
                    ELSE dnv.SoChungChiHanhNghe
               END      SoChungChiHanhNghe
              ,NULL  AS GiaCungChiTra
              ,PHYSIOTHERAPY.ID_Physiotherapy
              ,dnv.NickName
              ,GD2_BacSiDaiDien_GET.Nickname_BacSiLamDaiDien
              ,GD2_CanLamSang_BHYT.MUC_HUONG MUC_HUONG_2
              ,GD2_CanLamSang_BHYT.TYLE_TT
              ,GD2_CanLamSang_BHYT.THANH_TIEN
              ,NULL     T_TRANTT
              ,GD2_CanLamSang_BHYT.T_BNTT T_BNTT
              ,GD2_CanLamSang_BHYT.T_BNCCT T_BNCCT
              ,NULL Gia_BHYTchitra
              ,NULL T_BHTT
        FROM   k1
               JOIN PHYSIOTHERAPY
                    ON  PHYSIOTHERAPY.ID_Physiotherapy = k1.ID_Physiotherapy
               LEFT JOIN GD2_CanLamSang_BHYT
                    ON  GD2_CanLamSang_BHYT.ID_Physiotherapy = PHYSIOTHERAPY.ID_Physiotherapy
               LEFT JOIN HuyChiDinhChiTiet
                    ON  HuyChiDinhChiTiet.ID_Physiotherapy = PHYSIOTHERAPY.ID_Physiotherapy
               LEFT JOIN DM_NhanVien dnv
                    ON  PHYSIOTHERAPY.ID_BacSiChanDoanDienCo = dnv.ID_NhanVien
               OUTER APPLY dbo.GD2_BacSiDaiDien_GET(
            PHYSIOTHERAPY.ID_BacSiChanDoanDienCo
           ,PHYSIOTHERAPY.NgayGioTao
           ,PHYSIOTHERAPY.ID_LoaiKham
        )               GD2_BacSiDaiDien_GET
        WHERE  k1.ID_Physiotherapy IS NOT NULL
               AND ID_TrangThai<>'HuyBo'
               AND PHYSIOTHERAPY.Isbhyt = 1
    )
    ,k5 AS (
        SELECT DonThuocChiTiet.ID_Thuoc  AS id_loai
              ,DM_Thuoc.TenBietDuoc      AS ten
              ,DM_DonViTinh.TenDonViTinh
              ,ISNULL(GD2_DonThuocChiTietMoRong.GiaBHYT ,DonThuocChiTiet.Gia) Gia
              ,MaSoTheoDMBHYT
              ,(
                   CONVERT(DECIMAL(18 ,2) ,GD2_DonThuocChiTietMoRong.Gia_BHYTchitra)
               )*(
                   SoThuocThucXuat-dbo.[GD2_LaySoLuongThuocTraLaiNoiTru](DonThuocChiTiet.ID_Thuoc ,DonThuocChiTiet.ID_DonThuoc)
               )                         AS ThanhTienBaoHiem
              ,SoThuocThucXuat-dbo.[GD2_LaySoLuongThuocTraLaiNoiTru](DonThuocChiTiet.ID_Thuoc ,DonThuocChiTiet.ID_DonThuoc) AS 
               soluong
              ,10                        AS ID_Nhom_BHYT
              --,DonThuoc.NgayKeDon        AS NgayGio
			  -- Hưng sửa và bổ sung 
			  ,CASE WHEN gbant.ID_BenhAnNoiTru IS NOT NULL THEN gtdtct.NgayGioHieuLuc ELSE DonThuoc.NgayKeDon END NgayGio
			  ----------------------
              ,(GD2_DonThuocChiTietMoRong.Gia_BHYTchitra)/ISNULL(GD2_DonThuocChiTietMoRong.GiaBHYT ,DonThuocChiTiet.Gia) AS MUC_HUONG
              ,dnv.SoChungChiHanhNghe
              ,ThongTinThauBHYT
              ,DonThuocChiTiet.GiaCungChiTra
              ,DonThuocChiTiet.ID_DonThuocCT
              ,dnv.NickName
              ,NULL                      AS Nickname_BacSiLamDaiDien
              ,GD2_DonThuocChiTietMoRong.MUC_HUONG MUC_HUONG_2
              ,GD2_DonThuocChiTietMoRong.TYLE_TT
              ,GD2_DonThuocChiTietMoRong.THANH_TIEN
              ,GD2_DonThuocChiTietMoRong.T_TRANTT
              ,GD2_DonThuocChiTietMoRong.T_BNTT
              ,GD2_DonThuocChiTietMoRong.T_BNCCT
              ,GD2_DonThuocChiTietMoRong.Gia_BHYTchitra
              ,GD2_DonThuocChiTietMoRong.T_BHTT
        FROM   DonThuoc
               JOIN k1
                    ON  DonThuoc.ID_DonThuoc = k1.ID_DonThuoc
               JOIN DonThuocChiTiet
                    ON  DonThuocChiTiet.ID_DonThuoc = DonThuoc.ID_DonThuoc
               JOIN DM_Thuoc
                    ON  DonThuocChiTiet.ID_Thuoc = DM_Thuoc.ID_Thuoc
               JOIN DM_DonViTinh
                    ON  DM_Thuoc.ID_DonViTinh = DM_DonViTinh.ID_DonViTinh
               --LEFT JOIN DM_NhanVien dnv
               --     ON  dnv.ID_NhanVien = DonThuoc.ID_BacSiChoToa
			   -- Hưng sửa và bổ sung
			   LEFT JOIN GD2_BenhAnNoiTru gbant
                    ON  gbant.ID_LuotKham = DonThuoc.ID_LuotKham
               LEFT JOIN GD2_ToDieuTriChiTiet gtdtct
                    ON  gtdtct.ID_DonThuoc = DonThuoc.ID_DonThuoc
               LEFT JOIN DM_NhanVien dnv
                    ON  dnv.ID_NhanVien = ( CASE WHEN gbant.ID_BenhAnNoiTru IS NOT NULL THEN gtdtct.ID_NguoiHoanTat ELSE DonThuoc.ID_BacSiChoToa END )
			   ----------------------
               LEFT JOIN GD2_DonThuocChiTietMoRong
                    ON  GD2_DonThuocChiTietMoRong.ID_DonThuocChiTiet = DonThuocChiTiet.ID_DonThuocCT
        WHERE  (
                   DonThuoc.TrangThaiDonThuoc<>'Cancel'
                   OR TrangThaiDonThuoc IS NULL
               )
               AND DonThuoc.ToaChinh = 1
               AND DM_Thuoc.LaThuoc = 0
               AND DonThuocChiTiet.IsBhyt = 1
    ) 
    ,k6 AS(
        SELECT GD2_BHYT_DM_Giuong_HangBV.ID_Auto
              ,GD2_BHYT_DM_Giuong_HangBV.Ten_BHYT
              ,N'Ngày' AS DVT
              ,gbagb.DonGiaBH
              ,MaSoTheoDMBYT
              ,CASE 
                    WHEN @0=1640610 THEN 50872.5
                    WHEN @0=1647383
        AND NgayBHYT=0.5 THEN 80547.65
            WHEN @0=1648043
        AND NgayBHYT=0.5 THEN 84787.5
            WHEN @0=1650340
        AND NgayBHYT=0.5 THEN 84787.5
            WHEN @0=1653750
        AND NgayBHYT=0.5 THEN 50872.5
            WHEN @0=1654523
        AND NgayBHYT=0.5 THEN 84787.5
            WHEN @0=1660375
        AND NgayBHYT=0.5 THEN 84787.5
            WHEN @0=1661139
        AND NgayBHYT=0.5 THEN 84787.5
            WHEN @0=1661171
        AND NgayBHYT=0.5 THEN 84787.5
            WHEN @0=1665915
        AND NgayBHYT=0.5 THEN 43462.5
            WHEN @0=1673972
        AND NgayBHYT=0.5 THEN 50872.5
            WHEN @0=1674434
        AND NgayBHYT=0.5 THEN 50872.5
            
            
            ELSE gbagb.ThanhTienBaoHiemThuc END ThanhTienBH
       ,gbagb.NgayBHYT
       ,6 AS ID_Nhom_BHYT
       ,gbagb.NgayGioBatDauSuDung
       ,CASE 
             WHEN @0=1640610 THEN 0.57
             WHEN @0=1647383
        AND NgayBHYT=0.5 THEN 0.95
            WHEN @0=1648043
        AND NgayBHYT=0.5 THEN 0.95
            WHEN @0=1650340
        AND NgayBHYT=0.5 THEN 0.95
            WHEN @0=1653750
        AND NgayBHYT=0.5 THEN 0.57
            WHEN @0=1654523
        AND NgayBHYT=0.5 THEN 0.95
            WHEN @0=1660375
        AND NgayBHYT=0.5 THEN 0.95
            WHEN @0=1661171
        AND NgayBHYT=0.5 THEN 0.95
            WHEN @0=1661139
        AND NgayBHYT=0.5 THEN 0.95
            WHEN @0=1665915
        AND NgayBHYT=0.5 THEN 0.57
            WHEN @0=1673972
        AND NgayBHYT=0.5 THEN 0.57
            WHEN @0=1674434
        AND NgayBHYT=0.5 THEN 0.57
            
            
            
            ELSE gbagb.ThanhTienBaoHiemThuc/(gbagb.DonGiaBH*gbagb.NgayBHYT) 
            END MUC_HUONG
       ,'' AS SoChungChiHanhNghe
       ,'' AS ThongTinThauBHYT
       ,NULL AS GiaCungChiTra
       ,gbagb.Id_BenhAn_GiuongBenh
       ,NULL AS NickName
       ,NULL AS Nickname_BacSiLamDaiDien
       ,NULL MUC_HUONG_2
       ,NULL TYLE_TT
       ,NULL THANH_TIEN
       ,NULL T_TRANTT
       ,NULL T_BNTT
       ,NULL T_BNCCT
       ,NULL Gia_BHYTchitra
       ,NULL T_BHTT
        
        FROM k1 
        JOIN GD2_BenhAn_GiuongBenh gbagb ON gbagb.Id_BenhAn_GiuongBenh=k1.Id_BenhAn_GiuongBenh
        JOIN GD2_DMBuong_GiuongBenh gdgb ON gbagb.Id_BuongGiuong=gdgb.ID_Buong_Giuong
        JOIN GD2_BHYT_DM_Giuong_HangBV ON gbagb.Id_nhombenh=GD2_BHYT_DM_Giuong_HangBV.ID_Auto
        
        WHERE NgayBHYT>0
    )
    ,k11 AS (
        SELECT *
        FROM   k2
        UNION ALL 
        SELECT *
        FROM   k3
        UNION ALL 
        SELECT *
        FROM   k4
    )
    ,k12 AS(
        SELECT k11.ID_LoaiKham      AS id_loai
              ,DM_LoaiKham.TenBHYT  AS ten
              ,N'Lần'               AS TenDonViTinh
              ,k11.GiaBaoHiem       AS dongia
              ,MaSoTheoDVBHYT
              ,ThanhTienBaoHiem
              ,soluong
              ,ID_Nhom_BHYT
              ,k11.NgayGio
              ,k11.MUC_HUONG
              ,SoChungChiHanhNghe
              ,LoiKhuyen            AS ThongTinThauBHYT
              ,NULL                 AS GiaCungChiTra
              ,k11.ID_Kham
              ,NickName
              ,Nickname_BacSiLamDaiDien
              ,MUC_HUONG_2             MUC_HUONG_2
              ,TYLE_TT
              ,THANH_TIEN
              ,T_TRANTT
              ,T_BNTT
              ,T_BNCCT
              ,Gia_BHYTchitra
              ,T_BHTT
        FROM   k11
               JOIN DM_LoaiKham
                    ON  DM_LoaiKham.ID_LoaiKham = k11.ID_LoaiKham
    )
    ,k14 AS (
        SELECT *
        FROM   k12
        UNION ALL
        SELECT *
        FROM   k5
        UNION ALL
        SELECT *
        FROM   k6
    )
    ,k15 AS(
        SELECT k14.*
              ,dongia*soluong AS thanhtien
              ,ID_BHYT
        FROM   k14
               JOIN GD2_DMNHOM_BHYT
                    ON  GD2_DMNHOM_BHYT.ID_Nhom_BHYT = k14.ID_Nhom_BHYT
    )
    SELECT ten
          ,TenDonViTinh
          ,dongia
          ,MaSoTheoDVBHYT
          ,ThanhTienBaoHiem
          ,soluong
          ,ID_Nhom_BHYT
          ,thanhtien           AS thanhtien_2
          ,CASE 
                WHEN THANH_TIEN IS NOT NULL THEN THANH_TIEN
                ELSE thanhtien
           END	thanhtien
          ,ID_BHYT
          ,NgayGio
           --,CAST(MUC_HUONG*100 AS FLOAT)     MUC_HUONG
          ,CASE 
                WHEN MUC_HUONG_2 IS NOT NULL THEN MUC_HUONG_2
                ELSE CAST(MUC_HUONG*100 AS FLOAT)
           END                    MUC_HUONG
          ,CASE 
                WHEN TYLE_TT IS NOT NULL THEN TYLE_TT
                ELSE 100
           END                    TYLE_TT
          ,CASE 
                WHEN T_TRANTT IS NOT NULL THEN T_TRANTT
                ELSE thanhtien
           END                    T_TRANTT
           
           --, thanhtien-ThanhTienBaoHiem AS T_BNCCT
          --,ThanhTienBaoHiem
          ,CASE
				WHEN T_BHTT IS NOT NULL THEN T_BHTT
				ELSE ThanhTienBaoHiem
		  END T_BHTT
          ,SoChungChiHanhNghe
          ,SoChungChiHanhNghe  AS MA_BAC_SI
          ,ThongTinThauBHYT    AS TT_THAU
          ,GiaCungChiTra
          ,CASE 
				WHEN T_BNTT IS NOT NULL THEN T_BNTT ELSE
					CASE
						WHEN @MA_LYDO_VVIEN=3 AND @isNoiTru=1 THEN thanhtien*((100.0-@phantramtraituyenloaikham_noitru)/100.0)
						WHEN @MA_LYDO_VVIEN=3 AND @isNoiTru=0 THEN thanhtien*((100.0-@phantramtraituyenloaikham_ngoaitru)/100.0) --không có trường hợp này
						ELSE 0
					END
           END                    T_BNTT
          ,CASE 
				WHEN T_BNCCT IS NOT NULL THEN T_BNCCT ELSE
					CASE
						WHEN @MA_LYDO_VVIEN=3 AND @isNoiTru=1 THEN thanhtien*(@phantramtraituyenloaikham_noitru/100.0)-
							 ThanhTienBaoHiem
						WHEN @MA_LYDO_VVIEN=3 AND @isNoiTru=0 THEN thanhtien*(@phantramtraituyenloaikham_ngoaitru/100.0)
							-
							 ThanhTienBaoHiem --không có trường hợp này
						ELSE thanhtien-ThanhTienBaoHiem
					END
           END  T_BNCCT
          ,k15.id_kham
          ,NickName
          ,Nickname_BacSiLamDaiDien
          ,MUC_HUONG_2
          ,TYLE_TT TYLE_TT_2
          ,THANH_TIEN THANH_TIEN_2
          ,T_TRANTT T_TRANTT_2
          ,T_BNTT T_BNTT_2
          ,T_BNCCT T_BNCCT_2
          ,Gia_BHYTchitra Gia_BHYTchitra_2
          ,T_BHTT T_BHTT_2
    FROM   k15 
    WHERE  ID_BHYT<>7
           AND ID_BHYT<>6
           AND ID_BHYT<>4
           AND soluong>0
    ORDER BY
           ID_BHYT
          ,MaSoTheoDVBHYT
          ,T_BHTT  DESC`;
    let data = await this.connection.query(`${stored}`, [idThuTraNo]);
    const mabenhchinh = await this.getBenhChinh(idThuTraNo);
    const mabenhkem = await this.getBenhKem(idThuTraNo);
    data.map((item: any, index: number) => {
      item.id = (index + 1).toString();
      item.MABENHCHINH = mabenhchinh;
      item.MABENHKEM = mabenhkem;
      return item;
    });
    return data;
  }

  async exec_xml_4_chitietcls(idThuTraNo: any) {
    let stored = `SET NOCOUNT ON;
    DECLARE @id_luotkham INT
    SET @id_luotkham = (
            SELECT ID_LuotKham
            FROM   ThanhToanTong ttt
            WHERE  ttt.ID_ThuTraNo = @0
        )
    
    
    ;WITH k1 AS(
        SELECT Thu_TraNo_ChiTiet.*
        FROM   Thu_TraNo_ChiTiet
        WHERE  ID_ThuTraNo = @0
    )
    ,k2 AS(
        SELECT Kham.ID_LoaiKham
              ,kham.ID_Kham
              ,1                AS soluong
              ,kham.NgayGioTao  AS NgayGio
              ,kham.MoTa
              ,kham.KetLuan
              ,ISNULL(kham.NgayGioChanDoan ,kham.NgayGioTao) NgayGioChanDoan
        FROM   k1
               LEFT JOIN Kham
                    ON  k1.ID_Kham = Kham.ID_Kham
               LEFT JOIN HuyChiDinhChiTiet
                    ON  HuyChiDinhChiTiet.ID_Kham = k1.ID_Kham
        WHERE  k1.ID_DieuTriPhoiHop IS NULL
               AND k1.ID_Physiotherapy IS NULL
               AND ID_DonThuoc IS NULL
               AND Id_BenhAn_DichVu IS NULL
               AND Id_BenhAn_GiuongBenh IS NULL
               AND ID_TrangThai<>'HuyBo'
               AND HuyChiDinhChiTiet.ID_Kham IS NULL
               AND Kham.Isbhyt = 1
    )
    
    SELECT kqxn.KetQua              AS GIA_TRI
          ,DM_XetNghiem.MaXN_BHYT   AS MA_CHI_SO
          ,dlk.STT_BHYT				AS TEN_CHI_SO
          ,dlk.MaMayBHYT            AS MA_MAY
          ,dlk.MaSoTheoDVBHYT       AS MA_DICH_VU
          ,dlk.TenBHYT              AS TenLoaiKham
          ,k2.MoTa                  AS MO_TA
          ,k2.KetLuan               AS KET_LUAN
          ,k2.NgayGioChanDoan       AS NGAY_KQ
          ,k2.NgayGio
    FROM   k2
           LEFT JOIN KetQuaXetNghiem kqxn
                ON  kqxn.ID_Kham = k2.ID_Kham
           LEFT JOIN DM_XetNghiem
                ON  kqxn.ID_XetNghiem = DM_XetNghiem.ID_XetNghiem
           LEFT JOIN DM_LoaiKham dlk
                ON  dlk.ID_LoaiKham = k2.ID_LoaiKham
    WHERE  dlk.ID_NhomCLS<>20`;
    let data = await this.connection.query(`${stored}`, [idThuTraNo]);
    data.map((item: any, index: number) => {
      return (item.id = (index + 1).toString());
    });
    return data;
  }

  async exec_xml_5_dienbienbenh(idThuTraNo: any) {
    let stored = `SET NOCOUNT ON;
    DECLARE @id_luotkham INT
    DECLARE @isnoitru INT
    SELECT 
    @id_luotkham=ttt.ID_LuotKham 
    ,@isnoitru=gbant.ID_BenhAnNoiTru
    FROM ThanhToanTong ttt
    LEFT JOIN GD2_BenhAnNoiTru gbant ON gbant.ID_LuotKham = ttt.ID_LuotKham
     WHERE ttt.ID_ThuTraNo=@0
    
    IF(@isnoitru IS NULL )
      BEGIN	
        SELECT Kham.MoTa as DIEN_BIEN
        ,Kham.NgayGioTao AS  NGAY_YL
        ,'' AS  HOI_CHAN
        ,'' AS  PHAU_THUAT
          FROM Kham
          LEFT JOIN DM_LoaiKham AS dlk ON dlk.ID_LoaiKham = Kham.ID_LoaiKham
          
           WHERE ID_LuotKham=@id_luotkham 
           AND dlk.ID_NhomCLS=20
           AND Kham.MoTa<>''
           --AND IsBacSyChinh=1		
          --AND 	   MoTa<>''
      END
    ELSE 
      BEGIN
        ;with k1  as(select gbant.* from GD2_BenhAnNoiTru gbant WHERE gbant.ID_LuotKham=@id_luotkham )
        ,k2 as(
          select 
          gtdtct.DienBien,
          gtdtct.NgayGioHieuLuc
          from k1 
          JOIN GD2_TODIEUTRI gt ON gt.ID_BenhAnNoiTru = k1.ID_BenhAnNoiTru
          JOIN GD2_ToDieuTriChiTiet gtdtct ON gtdtct.ID_ToDieuTri = gt.ID_ToDieuTri
        )
        
        SELECT k2.DienBien as DIEN_BIEN
        ,NgayGioHieuLuc AS  NGAY_YL
        ,'' AS  HOI_CHAN
        ,'' AS  PHAU_THUAT
          FROM k2 	
          
        WHERE LTRIM(RTRIM(isnull(
          REPLACE(REPLACE(DienBien, CHAR(13), ''), CHAR(10), '')
          
        
        ,'')))<>''
        
        
         and NgayGioHieuLuc IS NOT NULL 
        ORDER BY NGAY_YL
      END`;
    let data = await this.connection.query(`${stored}`, [idThuTraNo]);
    data.map((item: any, index: number) => {
      return (item.id = (index + 1).toString());
    });
    return data;
  }

  async exec_stored_filter_date(dataDate: any) {
    let data = await this.connection.query(
      `EXEC ${dataDate.stored} '${dataDate.tungay}', '${dataDate.denngay}'`,
    );
    data.map((item: any, index: number) => {
      return (item.id = (index + 1).toString());
    });
    return data;
  }

  async dataBenhAnNoiTruBy(idThuTraNo: any) {
    var dataBenhAnNoiTruBy = await this.cacheManager.get(
      `dataBenhAnNoiTruByID_${idThuTraNo}`,
    );
    if (!dataBenhAnNoiTruBy) {
      dataBenhAnNoiTruBy = await this.connection.query(
        `select * from GD2_BenhAnNoiTru a join Thu_TraNo b on a.ID_LuotKham = b.ID_LuotKham where b.ID_ThuTraNo = @0`,
        [idThuTraNo],
      );
      await this.cacheManager.set(
        `dataBenhAnNoiTruByID_${idThuTraNo}`,
        dataBenhAnNoiTruBy,
        {
          ttl: 10,
        },
      );
    }
    return dataBenhAnNoiTruBy;
  }

  async isNoiTru(idThuTraNo: any): Promise<boolean> {
    const data: any = await this.dataBenhAnNoiTruBy(idThuTraNo);
    if (data && data.length != 0) return true;
    return false;
  }

  async getBenhChinh(idThuTraNo: any) {
    const dataBenhAnNoiTru: any = await this.dataBenhAnNoiTruBy(idThuTraNo);
    if (await this.isNoiTru(idThuTraNo))
      return dataBenhAnNoiTru[0]?.ICD_RaVienBenhChinh;
    return (
      await this.connection.query(
        `select MaICD10 from kham a join Thu_TraNo b on a.ID_LuotKham = b.ID_LuotKham where b.ID_ThuTraNo = @0 and a.IsBacSyChinh = 1 and a.ID_TrangThai<>'HuyBo'`,
        [idThuTraNo],
      )
    )[0]?.MaICD10;
  }

  async getBenhKem(idThuTraNo: any) {
    if (await this.isNoiTru(idThuTraNo))
      return Object.values(
        (
          await this.connection.query(
            `SELECT STUFF(
                 (
                 SELECT N';'+ISNULL(ttlkicd.maicd ,'')
                 FROM   thongtinluotkham_icd ttlkicd
                 JOIN Thu_TraNo b on ttlkicd.luotkham_id = b.ID_LuotKham
                 WHERE  b.ID_ThuTraNo = @0
                 and ttlkicd.loai = 'benhkem'
                 FOR XML PATH(N''), TYPE
                 ).value('.' ,'nvarchar(max)')
                 ,1
                 ,1
                 ,N''
                 )`,
            [idThuTraNo],
          )
        )[0],
      )[0]
        ? Object.values(
            (
              await this.connection.query(
                `SELECT STUFF(
                   (
                   SELECT N';'+ISNULL(ttlkicd.maicd ,'')
                   FROM   thongtinluotkham_icd ttlkicd
                   JOIN Thu_TraNo b on ttlkicd.luotkham_id = b.ID_LuotKham
                   WHERE  b.ID_ThuTraNo = @0
                   and ttlkicd.loai = 'benhkem'
                   FOR XML PATH(N''), TYPE
                   ).value('.' ,'nvarchar(max)')
                   ,1
                   ,1
                   ,N''
                   )`,
                [idThuTraNo],
              )
            )[0],
          )[0]
        : '';
    return Object.values(
      (
        await this.connection.query(
          `SELECT STUFF(
            (
            SELECT N';'+ISNULL(Kham.MaICD10 ,'')
            FROM   Kham
            JOIN DM_LoaiKham AS dlk
            ON  dlk.ID_LoaiKham = Kham.ID_LoaiKham
            JOIN Thu_TraNo b on Kham.ID_LuotKham = b.ID_LuotKham
            WHERE  b.ID_ThuTraNo = @0
            AND (Kham.ID_LoaiKham=10516 OR dlk.ID_NhomCLS=20)
            AND Kham.MaICD10 IS NOT NULL
            AND Kham.MaICD10<>''
            AND kham.IsBacSyChinh = 0
            AND ID_TrangThai<>'HuyBo'
            FOR XML PATH(N''), TYPE
            ).value('.' ,'nvarchar(max)')
            ,1
            ,1
            ,N''
            )`,
          [idThuTraNo],
        )
      )[0],
    )[0]
      ? Object.values(
          (
            await this.connection.query(
              `SELECT STUFF(
           (
           SELECT N';'+ISNULL(Kham.MaICD10 ,'')
           FROM   Kham
           JOIN DM_LoaiKham AS dlk
           ON  dlk.ID_LoaiKham = Kham.ID_LoaiKham
           JOIN Thu_TraNo b on Kham.ID_LuotKham = b.ID_LuotKham
           WHERE  b.ID_ThuTraNo = @0
           AND (Kham.ID_LoaiKham=10516 OR dlk.ID_NhomCLS=20)
           AND Kham.MaICD10 IS NOT NULL
           AND Kham.MaICD10<>''
           AND kham.IsBacSyChinh = 0
           AND ID_TrangThai<>'HuyBo'
           FOR XML PATH(N''), TYPE
           ).value('.' ,'nvarchar(max)')
           ,1
           ,1
           ,N''
           )`,
              [idThuTraNo],
            )
          )[0],
        )[0]
      : '';
  }
}
