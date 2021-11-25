import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Job, Queue } from 'bull';
import { Connection } from 'typeorm';
import Big from 'big.js';
import moment from 'moment';
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  format,
} from 'date-fns';
import { HttpService } from '@nestjs/axios';
import request from 'request';

@Processor('xml-bhyt')
@Injectable()
export class XmlBHYTProcessor {
  constructor(
    @InjectConnection() readonly connection: Connection,
    @InjectQueue('xml-bhyt') private readonly xmlBHYTQueue: Queue,
    private httpService: HttpService,
  ) {}
  private getFullDateBHYT = 'yyyyMMdd';
  private getFullDateTimeBHYT = 'yyyyMMddHHmm';
  @Process('xml-bhyt')
  async handle(job: Job) {
    // console.log('job.data.ID_ThuTraNo');
    try {
      let [thongtin, thongtinthuoc, thongtincls, ChisoCLS, ChisoNoiTru] =
        await Promise.all([
          this.get_thong_tin(job.data.ID_ThuTraNo, 'GD2_ThongTinLuotKhamBHYT'),
          this.get_thong_tin(
            job.data.ID_ThuTraNo,
            'GD2_BHYT_ngoaithuoc_quyettoan',
          ),
          this.get_thong_tin(
            job.data.ID_ThuTraNo,
            'GD2_BHYT_ngoaicls_quyettoan',
          ),
          this.get_thong_tin(
            job.data.ID_ThuTraNo,
            'GD2_BHYT_ChisoCLS_quyettoan',
          ),
          this.get_thong_tin(
            job.data.ID_ThuTraNo,
            'GD2_BHYT_ChisoNoiTru_quyettoan',
          ),
        ]);

      thongtin = thongtin[0];
      let ThanhTienBaoHiem = new Big(0);
      let T_BNTT = new Big(0);
      let T_BNCCT = new Big(0);
      let T_TONGCHI = new Big(0);
      const chitietthuoc = await this.xml_2_thuoc(thongtinthuoc, thongtin);
      const chitietcls = await this.xml_3_canlamsang(thongtincls, thongtin);
      const ThanhTienBaoHiem_CLS = new Big(chitietcls.ThanhTienBaoHiem);
      const ThanhTienBaoHiem_Thuoc = new Big(chitietthuoc.ThanhTienBaoHiem);
      const T_BNTT_CLS = new Big(chitietcls.T_BNTT);
      const T_BNCCT_CLS = new Big(chitietcls.T_BNCCT);
      const T_BNTT_Thuoc = new Big(chitietthuoc.T_BNTT);
      const T_BNCCT_Thuoc = new Big(chitietthuoc.T_BNCCT);
      const tongthuoc = new Big(chitietthuoc.tongthuoc);
      const tongcls = new Big(chitietcls.tongcls);
      const tongvtyt = new Big(chitietcls.tongvtyt);

      if (chitietcls.tongcls) {
        T_TONGCHI = tongthuoc.plus(chitietcls.tongcls);
      }
      if (ThanhTienBaoHiem_CLS) {
        ThanhTienBaoHiem = ThanhTienBaoHiem_Thuoc.plus(ThanhTienBaoHiem_CLS);
      }

      if (T_BNTT_CLS) {
        T_BNTT = T_BNTT_Thuoc.plus(T_BNTT_CLS);
      }

      if (T_BNCCT_CLS) {
        T_BNCCT = T_BNCCT_Thuoc.plus(T_BNCCT_CLS);
      }
      if (ThanhTienBaoHiem == tongthuoc.plus(tongcls)) {
        thongtin.phantramchitra = 100;
      }
      if (tongcls) {
        T_TONGCHI = tongthuoc.plus(tongcls);
      }

      const tonghop = await this.xml_1_tonghop(
        thongtin,
        tongthuoc,
        tongvtyt,
        T_TONGCHI,
        T_BNTT,
        ThanhTienBaoHiem,
        T_BNCCT,
      );
      const XML6 =
        '</HOSO></DANHSACHHOSO></THONGTINHOSO><CHUKYDONVI /></GIAMDINHHS>';
      const chitietchisocls = await this.xml_4_chitietcls(ChisoCLS, thongtin);
      const DienBienBenh = await this.xml_5_dienbienbenh(ChisoNoiTru, thongtin);
      const tong =
        tonghop +
        chitietthuoc.chitietthuoc +
        chitietcls.chitietcls +
        chitietchisocls +
        DienBienBenh +
        XML6;
      const filename = `${(await '4210_') + thongtin.MA_BN}_${
        job.data.ID_ThuTraNo
      }.xml`;

      const username = '48195_BV';
      const password = '72483341875d30c993b0e004c4a235e8';

      const Api = await this.httpService
        .post('https://egw.baohiemxahoi.gov.vn/api/token/take', {
          username,
          password,
        })
        .toPromise();
      const buffer = Buffer.from(tong);

      await request(
        {
          url: `https://egw.baohiemxahoi.gov.vn/api/egw/guiHoSoGiamDinh4210?token=${Api?.data?.APIKey?.access_token}&id_token=${Api?.data?.APIKey?.id_token}&username=${username}&password=${password}&loaiHoSo=3&maTinh=48&maCSKCB=48195`,
          method: 'POST',
          json: true,
          body: Array.prototype.slice.call(buffer, 0),
        },
        async (error, response, body) => {
          await this.wait(3000);     
          const loi = await this.httpService
            .post(
              `https://egw.baohiemxahoi.gov.vn/api/egw/nhanChiTietLoiHS4210?token=${Api?.data.APIKey.access_token}&id_token=${Api?.data.APIKey.id_token}&username=${username}&password=${password}&maCSKCB=48195&maGiaoDich=${response.body.maGiaoDich}`,
            )
            .toPromise();
          let maLoi = null;
          let MoTa = '';
          if (loi?.data?.dsLoi?.length > 0) {
            // eslint-disable-next-line prefer-destructuring
            maLoi = loi?.data?.dsLoi[0]?.maLoi;
            MoTa = JSON.stringify(
              loi?.data?.dsLoi?.map(({ moTaLoi }) => moTaLoi),
            );
          }
          console.dir({ MoTa, filename, maGiaoDich: response.body.maGiaoDich });
          await this.connection.query(
            `EXEC GD2_BHYT_xml_DaChuyen_Update '${thongtin.MA_LK}', '${response.body.maGiaoDich}', '${maLoi}', '${MoTa}'`,
          );
        },
      );
    } catch (err) {
      console.log(err);
    }
  }
  async get_thong_tin(id_thutrano: string, store_name: string) {
    const data = await this.connection.query(
      `EXEC ${store_name} ${id_thutrano}`,
    );
    return data;
  }
  xml_1_tonghop(
    thongtin,
    tongthuoc,
    tongvtyt,
    T_TONGCHI,
    T_BNTT,
    ThanhTienBaoHiem,
    T_BNCCT,
    base64 = true,
  ) {
    const NGAYLAP = format(
      new Date(this.toIsoString(thongtin.NGAYLAP)),
      this.getFullDateBHYT,
    );
    let tonghop = '';
    if (thongtin.CAN_NANG === null) {
      thongtin.CAN_NANG = '';
    }
    const NAM_QT = format(new Date(this.toIsoString(thongtin.NGAYLAP)), 'yyyy');
    const THANG_QT = format(new Date(this.toIsoString(thongtin.NGAYLAP)), 'MM');
    const { MA_KHOA } = thongtin;
    if (thongtin.CAN_NANG === '') {
      const date1 = this.toIsoString(thongtin.NGAY_SINH);
      const date2 = this.toIsoString(thongtin.NGAY_VAO);
      const diffYears = differenceInYears(+date1, +date2);
      const diffMonths = differenceInMonths(+date1, +date2);
      const diffDays = differenceInDays(+date1, +date2);
      let months = diffYears * 12 + diffMonths;
      if (diffDays > 0) {
        let new_months = months.toString();
        new_months += `.${+diffDays}`;
      } else if (diffDays < 0) {
        months -= 1;
        let new_months = months.toString();
        new_months += `.${
          format(
            new Date(
              +format(new Date(date2), 'yyyy'),
              +format(new Date(date2), 'mm'),
              0,
            ),
            'dd',
          ) + diffDays
        }`;
      }
      if (months <= 2) {
        thongtin.CAN_NANG = 3.5;
      }
      if (months > 2 && months <= 5) {
        thongtin.CAN_NANG = 5;
      }
      if (months > 5 && months <= 9) {
        thongtin.CAN_NANG = 7.5;
      }
      if (months > 9 && months <= 12) {
        thongtin.CAN_NANG = 8.5;
      }
    }
    tonghop += '<TONG_HOP>';
    tonghop += `<MA_LK>${thongtin.MA_LK}</MA_LK>`;
    tonghop += '<STT>1</STT>';
    tonghop += `<MA_BN>${thongtin.MA_BN}</MA_BN>`;
    tonghop += `<HO_TEN>${thongtin.HO_TEN}</HO_TEN>`;
    // tonghop += `<NGAY_SINH>${custom.formatDateBHYT(
    //   thongtin.NGAY_SINH,
    // )}</NGAY_SINH>`;
    tonghop += `<NGAY_SINH>${format(
      new Date(this.toIsoString(thongtin.NGAY_SINH)),
      this.getFullDateBHYT,
    )}</NGAY_SINH>`;
    tonghop += `<GIOI_TINH>${thongtin.GIOI_TINH}</GIOI_TINH>`;
    tonghop += `<DIA_CHI><![CDATA[${thongtin.DIA_CHI.replace(
      '&',
      '',
    )}]]></DIA_CHI>`;
    tonghop += `<MA_THE>${thongtin.MA_THE}</MA_THE>`;
    tonghop += `<MA_DKBD>${thongtin.MA_DKBD.replace('-', '')}</MA_DKBD>`;
    // tonghop += `<GT_THE_TU>${custom.formatDateBHYT(
    //   thongtin.GT_THE_TU,
    // )}</GT_THE_TU>`;
    tonghop += `<GT_THE_TU>${format(
      new Date(this.toIsoString(thongtin.GT_THE_TU)),
      this.getFullDateBHYT,
    )}</GT_THE_TU>`;
    // tonghop += `<GT_THE_DEN>${custom.formatDateBHYT(
    //   thongtin.GT_THE_DEN,
    // )}</GT_THE_DEN>`;
    tonghop += `<GT_THE_DEN>${format(
      new Date(this.toIsoString(thongtin.GT_THE_DEN)),
      this.getFullDateBHYT,
    )}</GT_THE_DEN>`;
    tonghop += '<MIEN_CUNG_CT></MIEN_CUNG_CT>';
    tonghop += `<TEN_BENH><![CDATA[${thongtin.TEN_BENH}]]></TEN_BENH>`;
    tonghop += `<MA_BENH>${thongtin.MA_BENH}</MA_BENH>`;
    tonghop += `<MA_BENHKHAC>${thongtin.MA_BENHKHAC}</MA_BENHKHAC>`;
    tonghop += `<MA_LYDO_VVIEN>${thongtin.MA_LYDO_VVIEN}</MA_LYDO_VVIEN>`;
    tonghop += '<MA_NOI_CHUYEN />';
    tonghop += '<MA_TAI_NAN />';
    // tonghop += `<NGAY_VAO>${custom.formatDatehour(
    //   thongtin.NGAY_VAO,
    // )}</NGAY_VAO>`;
    tonghop += `<NGAY_VAO>${format(
      new Date(this.toIsoString(thongtin.NGAY_VAO)),
      this.getFullDateTimeBHYT,
    )}</NGAY_VAO>`;
    // tonghop += `<NGAY_RA>${custom.formatDatehour(thongtin.NGAY_RA)}</NGAY_RA>`;
    tonghop += `<NGAY_RA>${format(
      new Date(this.toIsoString(thongtin.NGAY_RA)),
      this.getFullDateTimeBHYT,
    )}</NGAY_RA>`;

    tonghop += `<SO_NGAY_DTRI>${Math.ceil(
      thongtin.SO_NGAY_DTRI,
    )}</SO_NGAY_DTRI>`;
    tonghop += `<KET_QUA_DTRI>${thongtin.KET_QUA_DTRI}</KET_QUA_DTRI>`;
    tonghop += `<TINH_TRANG_RV>${thongtin.TINH_TRANG_RV}</TINH_TRANG_RV>`;
    // tonghop += `<NGAY_TTOAN>${custom.formatDatehour(
    //   thongtin.NGAY_TTOAN,
    // )}</NGAY_TTOAN>`;
    tonghop += `<NGAY_TTOAN>${format(
      new Date(this.toIsoString(thongtin.NGAY_TTOAN)),
      this.getFullDateTimeBHYT,
    )}</NGAY_TTOAN>`;
    tonghop += `<T_THUOC>${tongthuoc}</T_THUOC>`;
    tonghop += `<T_VTYT>${tongvtyt}</T_VTYT>`;
    tonghop += `<T_TONGCHI>${T_TONGCHI}</T_TONGCHI>`;
    tonghop += `<T_BNTT>${T_BNTT}</T_BNTT>`;
    tonghop += `<T_BHTT>${ThanhTienBaoHiem}</T_BHTT>`;
    tonghop += `<T_BNCCT>${T_BNCCT}</T_BNCCT>`;
    tonghop += '<T_NGUONKHAC>0</T_NGUONKHAC>';
    var T_NGOAIDS_New = '0';
    if (+NAM_QT >= 2021 && +THANG_QT >= 7 && thongtin.Is_NoiTru == '0') {
      if (
        thongtin.MA_THE.startsWith('QN') ||
        thongtin.MA_THE.startsWith('CA') ||
        thongtin.MA_THE.startsWith('CY')
      ) {
        T_NGOAIDS_New = ThanhTienBaoHiem;
      }
    }
    tonghop += `<T_NGOAIDS>${T_NGOAIDS_New}</T_NGOAIDS>`;
    var MA_LOAI_KCB_New = thongtin.MA_LOAI_KCB;
    if (+NAM_QT >= 2021 && +THANG_QT >= 7 && thongtin.Is_NoiTru == '0') {
      var icd_tam = [
        'E10',
        'E10.0',
        'E10.1',
        'E10.2†',
        'E10.3†',
        'E10.4†',
        'E10.5',
        'E10.6',
        'E10.7',
        'E10.8',
        'E10.9',
        'E11',
        'E11.0',
        'E11.1',
        'E11.2†',
        'E11.3†',
        'E11.4†',
        'E11.5',
        'E11.6',
        'E11.7',
        'E11.8',
        'E11.9',
        'E12',
        'E12.0',
        'E12.1',
        'E12.2†',
        'E12.3†',
        'E12.4†',
        'E12.5',
        'E12.6',
        'E12.7',
        'E12.8',
        'E12.9',
        'E13',
        'E13.0',
        'E13.1',
        'E13.2†',
        'E13.3†',
        'E13.4†',
        'E13.5',
        'E13.6',
        'E13.7',
        'E13.8',
        'E13.9',
        'E14',
        'E14.0',
        'E14.1',
        'E14.2†',
        'E14.3†',
        'E14.4†',
        'E14.5',
        'E14.6',
        'E14.7',
        'E14.8',
        'E14.9',
        'I10',
        'I11',
        'I11.0',
        'I11.9',
        'I12',
        'I12.0',
        'I12.9',
        'I13',
        'I13.0',
        'I13.1',
        'I13.2',
        'I13.9',
        'I15',
        'I15.0',
        'I15.1',
        'I15.2',
        'I15.8',
        'I15.9',
      ];
      if (icd_tam.includes(thongtin.MA_BENH)) {
        MA_LOAI_KCB_New = 2;
      } else {
        MA_LOAI_KCB_New = 1;
      }
      // for (var i = 0; i < icd_tam.length; i++) {
      //   if (thongtin.MA_BENH == icd_tam[i]) {
      //      MA_LOAI_KCB_New = 2;
      //     break;
      //   } else {
      //     MA_LOAI_KCB_New = 1;
      //   }
      // }
    }
    tonghop += `<MA_LOAI_KCB>${MA_LOAI_KCB_New}</MA_LOAI_KCB>`;
    tonghop += `<NAM_QT>${NAM_QT}</NAM_QT>`;
    tonghop += `<THANG_QT>${THANG_QT}</THANG_QT>`;
    tonghop += `<MA_KHOA>${MA_KHOA}</MA_KHOA>`;
    tonghop += '<MA_CSKCB>48195</MA_CSKCB>';
    tonghop += '<MA_KHUVUC />';
    tonghop += '<MA_PTTT_QT />';
    tonghop += `<CAN_NANG>${thongtin.CAN_NANG}</CAN_NANG>`;
    tonghop += '</TONG_HOP>';
    // eslint-disable-next-line no-buffer-constructor
    if (base64) {
      tonghop = new Buffer(tonghop).toString('base64');
    }
    tonghop = `<?xml version="1.0" encoding="utf-8"?><GIAMDINHHS xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><THONGTINDONVI><MACSKCB>48195</MACSKCB></THONGTINDONVI><THONGTINHOSO><NGAYLAP>${NGAYLAP}</NGAYLAP><SOLUONGHOSO>1</SOLUONGHOSO><DANHSACHHOSO><HOSO><FILEHOSO><LOAIHOSO>XML1</LOAIHOSO><NOIDUNGFILE>${tonghop}`;
    tonghop += '</NOIDUNGFILE></FILEHOSO>';
    // console.log(tonghop);

    return tonghop;
  }
  xml_2_thuoc(thongtinthuoc, thongtin, base64 = true) {
    const NAM_QT = format(new Date(this.toIsoString(thongtin.NGAYLAP)), 'yyyy');
    const THANG_QT = format(new Date(this.toIsoString(thongtin.NGAYLAP)), 'MM');
    let T_BNTT = new Big(0);
    let ThanhTienBaoHiem = new Big(0);
    let T_BNCCT = new Big(0);
    const { MA_KHOA } = thongtin;
    let chitietthuoc = '';
    let tongthuoc = new Big(0);

    if (thongtinthuoc.length > 0) {
      chitietthuoc += '<DSACH_CHI_TIET_THUOC>';
      for (let i = 0; i < thongtinthuoc.length; i++) {
        if (thongtinthuoc[i].HamLuong === null) {
          thongtinthuoc[i].HamLuong = '';
        }
        if (thongtinthuoc[i].SignNumber === null) {
          thongtinthuoc[i].SignNumber = '';
        }
        if (
          thongtinthuoc[i].MA_KHOA == '' ||
          thongtinthuoc[i].MA_KHOA === null
        ) {
          thongtinthuoc[i].MA_KHOA = MA_KHOA;
        }
        if (thongtinthuoc[i].MA_BAC_SI === null) {
        } else {     
          var MA_BAC_SI = thongtinthuoc[i].MA_BAC_SI;
        }
        if (thongtinthuoc[i].thanhtien) {
          tongthuoc = tongthuoc.plus(thongtinthuoc[i].thanhtien);
        }
        if (thongtinthuoc[i].ThanhTienBaoHiem) {
          ThanhTienBaoHiem = ThanhTienBaoHiem.plus(
            thongtinthuoc[i].ThanhTienBaoHiem,
          );
        }
        if (thongtinthuoc[i].T_BNTT) {
          T_BNTT = T_BNTT.plus(thongtinthuoc[i].T_BNTT);
        }
        if (thongtinthuoc[i].T_BNCCT) {
          T_BNCCT = T_BNCCT.plus(thongtinthuoc[i].T_BNCCT);
        }
        chitietthuoc += '<CHI_TIET_THUOC>';
        chitietthuoc += `<MA_LK>${thongtin.MA_LK}</MA_LK>`;
        chitietthuoc += `<STT>${i + 1}</STT>`;
        chitietthuoc += `<MA_THUOC>${thongtinthuoc[i].MaSoTheoDMBHYT}</MA_THUOC>`;
        chitietthuoc += `<MA_NHOM>${thongtinthuoc[i].id_nhombhyt}</MA_NHOM>`;
        chitietthuoc += `<TEN_THUOC><![CDATA[${thongtinthuoc[i].ten}]]></TEN_THUOC>`;
        chitietthuoc += `<DON_VI_TINH><![CDATA[${thongtinthuoc[i].TenDonViTinh}]]></DON_VI_TINH>`;
        chitietthuoc += `<HAM_LUONG><![CDATA[${thongtinthuoc[i].HamLuong}]]></HAM_LUONG>`;
        chitietthuoc += `<DUONG_DUNG>${thongtinthuoc[i].MaDD_BHYT}</DUONG_DUNG>`;
        chitietthuoc += `<LIEU_DUNG><![CDATA[${thongtinthuoc[i].CachDung}]]></LIEU_DUNG>`;
        chitietthuoc += `<SO_DANG_KY>${thongtinthuoc[i].SignNumber}</SO_DANG_KY>`;
        chitietthuoc += `<TT_THAU><![CDATA[${thongtinthuoc[i].TT_THAU}]]></TT_THAU>`;
        chitietthuoc += '<PHAM_VI>1</PHAM_VI>';
        chitietthuoc += `<TYLE_TT>${Math.round(
          thongtinthuoc[i].TYLE_TT,
        )}</TYLE_TT>`;
        chitietthuoc += `<SO_LUONG>${thongtinthuoc[i].soluong}</SO_LUONG>`;
        chitietthuoc += `<DON_GIA>${thongtinthuoc[i].dongia}</DON_GIA>`;
        chitietthuoc += `<THANH_TIEN>${thongtinthuoc[i].thanhtien}</THANH_TIEN>`;
        chitietthuoc += `<MUC_HUONG>${Math.round(
          thongtinthuoc[i].MUC_HUONG,
        )}</MUC_HUONG>`;
        chitietthuoc += '<T_NGUONKHAC>0</T_NGUONKHAC>';
        chitietthuoc += `<T_BNTT>${thongtinthuoc[i].T_BNTT}</T_BNTT>`;
        chitietthuoc += `<T_BNCCT>${thongtinthuoc[i].T_BNCCT}</T_BNCCT>`;
        chitietthuoc += `<T_BHTT>${thongtinthuoc[i].T_BHTT}</T_BHTT>`;
        var T_NGOAIDS_New = '0';
        if (+NAM_QT >= 2021 && +THANG_QT >= 7 && thongtin.Is_NoiTru == '0') {
          if (
            thongtin.MA_THE.startsWith('QN') ||
            thongtin.MA_THE.startsWith('CA') ||
            thongtin.MA_THE.startsWith('CY')
          ) {
            T_NGOAIDS_New = thongtinthuoc[i].T_BHTT;
          }
        }
        chitietthuoc += `<T_NGOAIDS>${T_NGOAIDS_New}</T_NGOAIDS>`;
        chitietthuoc += `<MA_KHOA>${thongtinthuoc[i].MA_KHOA}</MA_KHOA>`;
        chitietthuoc += `<MA_BAC_SI>${MA_BAC_SI}</MA_BAC_SI>`;
        var mabenh_new = thongtin.MA_BENH;
        if (+NAM_QT >= 2021 && +THANG_QT >= 7 && thongtin.Is_NoiTru == '0') {
          if (thongtin.MA_BENHKHAC != '' && thongtin.MA_BENHKHAC != null) {
            mabenh_new += `;${thongtin.MA_BENHKHAC}`;
          }
        }
        chitietthuoc += `<MA_BENH>${mabenh_new}</MA_BENH>`;
        chitietthuoc += `<NGAY_YL>${format(
          new Date(this.toIsoString(thongtinthuoc[i].NgayKeDon)),
          this.getFullDateTimeBHYT,
        )}</NGAY_YL>`;
        chitietthuoc += '<MA_PTTT>0</MA_PTTT>';
        chitietthuoc += '</CHI_TIET_THUOC>';
      }
      chitietthuoc += '</DSACH_CHI_TIET_THUOC>';
      if (base64) {
        chitietthuoc = Buffer.from(chitietthuoc).toString('base64');
      }
      chitietthuoc = `<FILEHOSO><LOAIHOSO>XML2</LOAIHOSO><NOIDUNGFILE>${chitietthuoc}</NOIDUNGFILE></FILEHOSO>`;
    }
    return {
      chitietthuoc,
      tongthuoc,
      ThanhTienBaoHiem,
      T_BNTT,
      T_BNCCT,
    };
  }
  xml_3_canlamsang(thongtincls, thongtin, base64 = true) {  
    const NAM_QT = format(new Date(this.toIsoString(thongtin.NGAYLAP)), 'yyyy');
    const THANG_QT = format(new Date(this.toIsoString(thongtin.NGAYLAP)), 'MM');
    let chitietcls = '';
    let T_BNTT = new Big(0);
    let tongvtyt = new Big(0);
    let tongcls = new Big(0);
    let ThanhTienBaoHiem = new Big(0);
    let T_BNCCT = new Big(0);
    const { MA_KHOA } = thongtin;
    for (let i = 0; i < thongtincls.length; i++) {
      if (i == 0) {
        chitietcls = '<DSACH_CHI_TIET_DVKT>';
      }

      if (thongtincls[i].thanhtien) {
        tongcls = tongcls.plus(thongtincls[i].thanhtien);
      }

      if (thongtincls[i].ThanhTienBaoHiem) {
        ThanhTienBaoHiem = ThanhTienBaoHiem.plus(
          thongtincls[i].ThanhTienBaoHiem,
        );
      }

      if (thongtincls[i].T_BNTT) {
        T_BNTT = T_BNTT.plus(thongtincls[i].T_BNTT);
      }

      if (thongtincls[i].T_BNCCT) {
        T_BNCCT = T_BNCCT.plus(thongtincls[i].T_BNCCT);
      }

      if (thongtincls[i].MA_BAC_SI === null) {
        thongtincls[i].MA_BAC_SI = '';
      }
      if (thongtincls[i].TT_THAU === null) {
        thongtincls[i].TT_THAU = '';
      }
      thongtincls[i].cungchitra = 100;
      chitietcls += '<CHI_TIET_DVKT>';
      chitietcls += `<MA_LK>${thongtin.MA_LK}</MA_LK>`;
      chitietcls += `<STT>${i + 1}</STT>`;
      if (thongtincls[i].ID_BHYT == 10) {
        if (thongtincls[i].thanhtien) {
          tongvtyt = tongvtyt.plus(thongtincls[i].thanhtien);
        }
        chitietcls += '<MA_DICH_VU></MA_DICH_VU>';
        chitietcls += `<MA_VAT_TU>${thongtincls[i].MaSoTheoDVBHYT}</MA_VAT_TU>`;
        chitietcls += `<TEN_VAT_TU><![CDATA[${thongtincls[i].ten}]]></TEN_VAT_TU>`;
      } else {
        chitietcls += `<MA_DICH_VU>${thongtincls[i].MaSoTheoDVBHYT}</MA_DICH_VU>`;
        chitietcls += '<MA_VAT_TU></MA_VAT_TU>';
        chitietcls += '<TEN_VAT_TU></TEN_VAT_TU>';
      }
      chitietcls += `<MA_NHOM>${thongtincls[i].ID_BHYT}</MA_NHOM>`;
      chitietcls += '<GOI_VTYT></GOI_VTYT>';
      chitietcls += `<TEN_DICH_VU><![CDATA[${thongtincls[i].ten}]]></TEN_DICH_VU>`;
      chitietcls += '<DON_VI_TINH>Lần</DON_VI_TINH>';
      chitietcls += '<PHAM_VI>1</PHAM_VI>';
      chitietcls += `<SO_LUONG>${thongtincls[i].soluong}</SO_LUONG>`;
      chitietcls += `<DON_GIA>${thongtincls[i].dongia}</DON_GIA>`;
      chitietcls += `<TT_THAU>${thongtincls[i].TT_THAU}</TT_THAU>`;
      chitietcls += `<MUC_HUONG>${thongtincls[i].MUC_HUONG}</MUC_HUONG>`;
      chitietcls += '<T_NGUONKHAC>0</T_NGUONKHAC>';
      chitietcls += `<T_BNTT>${thongtincls[i].T_BNTT}</T_BNTT>`;
      chitietcls += `<T_BNCCT>${thongtincls[i].T_BNCCT}</T_BNCCT>`;
      chitietcls += `<T_BHTT>${thongtincls[i].T_BHTT}</T_BHTT>`;
      var T_NGOAIDS_New = '0';
      if (+NAM_QT >= 2021 && +THANG_QT >= 7 && thongtin.Is_NoiTru == '0') {
        if (
          thongtin.MA_THE.startsWith('QN') ||
          thongtin.MA_THE.startsWith('CA') ||
          thongtin.MA_THE.startsWith('CY')
        ) {
          T_NGOAIDS_New = thongtincls[i].T_BHTT;
        }
      }
      chitietcls += `<T_NGOAIDS>${T_NGOAIDS_New}</T_NGOAIDS>`;
      if (thongtincls[i].ID_BHYT == 15) {
        chitietcls += '<MA_GIUONG>H1</MA_GIUONG>';
      } else {
        chitietcls += '<MA_GIUONG></MA_GIUONG>';
      }
      chitietcls += `<TYLE_TT>${Math.round(thongtincls[i].TYLE_TT)}</TYLE_TT>`;
      chitietcls += `<THANH_TIEN>${thongtincls[i].thanhtien}</THANH_TIEN>`;
      chitietcls += `<T_TRANTT>${thongtincls[i].T_TRANTT}</T_TRANTT>`;
      chitietcls += `<MA_KHOA>${MA_KHOA}</MA_KHOA>`;
      chitietcls += `<MA_BAC_SI>${thongtincls[i].MA_BAC_SI}</MA_BAC_SI>`;
      var mabenh_new = thongtin.MA_BENH;
      if (+NAM_QT >= 2021 && +THANG_QT >= 7 && thongtin.Is_NoiTru == '0') {
        if (thongtin.MA_BENHKHAC != '' && thongtin.MA_BENHKHAC != null) {
          mabenh_new += `;${thongtin.MA_BENHKHAC}`;
        }
      }
      chitietcls += `<MA_BENH>${mabenh_new}</MA_BENH>`;
      chitietcls += `<NGAY_YL>${format(
        new Date(this.toIsoString(thongtincls[i].NgayGio)),
        this.getFullDateTimeBHYT,
      )}</NGAY_YL>`;
      chitietcls += '<NGAY_KQ></NGAY_KQ>';
      chitietcls += '<MA_PTTT>0</MA_PTTT>';
      chitietcls += '</CHI_TIET_DVKT>';
      if (i == thongtincls.length - 1) {
        chitietcls += '</DSACH_CHI_TIET_DVKT>';
      }
    }

    if (base64) {
      chitietcls = Buffer.from(chitietcls).toString('base64');
    }
    chitietcls = `<FILEHOSO><LOAIHOSO>XML3</LOAIHOSO><NOIDUNGFILE>${chitietcls}</NOIDUNGFILE></FILEHOSO>`;
    return {
      chitietcls,
      tongcls,
      ThanhTienBaoHiem,
      T_BNTT,
      T_BNCCT,
      tongvtyt,
    };
  }
  xml_4_chitietcls(ChisoCLS, thongtin, base64 = true) {
    let chitietchisocls = '';
    if (ChisoCLS.length > 0) {
      for (let i = 0; i < ChisoCLS.length; i += 1) {
        if (i == 0) {
          chitietchisocls = '<DSACH_CHI_TIET_CLS>';
        }
        chitietchisocls += '<CHI_TIET_CLS>';
        chitietchisocls += `<MA_LK>${thongtin.MA_LK}</MA_LK>`;
        chitietchisocls += `<STT>${i + 1}</STT>`;
        chitietchisocls += `<MA_DICH_VU>${
          ChisoCLS[i].MA_DICH_VU == null ? '' : ChisoCLS[i].MA_DICH_VU
        }</MA_DICH_VU>`;
        chitietchisocls += `<MA_CHI_SO>${
          ChisoCLS[i].MA_CHI_SO == null ? '' : ChisoCLS[i].MA_CHI_SO
        }</MA_CHI_SO>`;
        chitietchisocls += `<TEN_CHI_SO>${
          ChisoCLS[i].TEN_CHI_SO == null
            ? ''
            : `<![CDATA[${ChisoCLS[i].TEN_CHI_SO}]]>`
        }</TEN_CHI_SO>`;
        chitietchisocls += `<GIA_TRI>${
          ChisoCLS[i].GIA_TRI == null
            ? ''
            : `<![CDATA[${ChisoCLS[i].GIA_TRI}]]>`
        }</GIA_TRI>`;
        chitietchisocls += `<MA_MAY>${
          ChisoCLS[i].MA_MAY == null ? '' : ChisoCLS[i].MA_MAY
        }</MA_MAY>`;
        chitietchisocls += `<MO_TA>${
          ChisoCLS[i].MO_TA == null ? '' : `<![CDATA[${ChisoCLS[i].MO_TA}]]>`
        }</MO_TA>`;
        chitietchisocls += `<KET_LUAN>${
          ChisoCLS[i].KET_LUAN == null
            ? ''
            : `<![CDATA[${ChisoCLS[i].KET_LUAN}]]>`
        }</KET_LUAN>`;
        chitietchisocls += `<NGAY_KQ>${format(
          new Date(this.toIsoString(ChisoCLS[i].NGAY_KQ)),
          this.getFullDateTimeBHYT,
        )}</NGAY_KQ>`;
        chitietchisocls += '</CHI_TIET_CLS>';
        if (i == ChisoCLS.length - 1) {
          chitietchisocls += '</DSACH_CHI_TIET_CLS>';
        }
      }
      if (base64) {
        chitietchisocls = Buffer.from(chitietchisocls).toString('base64');
      }
      chitietchisocls = `<FILEHOSO><LOAIHOSO>XML4</LOAIHOSO><NOIDUNGFILE>${chitietchisocls}</NOIDUNGFILE></FILEHOSO>`;
    }
    return chitietchisocls;
  }
  xml_5_dienbienbenh(ChisoNoiTru, thongtin, base64 = true) {
    let DienBienBenh = '';
    for (let i = 0; i < ChisoNoiTru.length; i += 1) {
      if (i == 0) {
        DienBienBenh = '<DSACH_CHI_TIET_DIEN_BIEN_BENH>';
      }
      DienBienBenh += '<CHI_TIET_DIEN_BIEN_BENH>';
      DienBienBenh += `<MA_LK>${thongtin.MA_LK}</MA_LK>`;
      DienBienBenh += `<STT>${i + 1}</STT>`;
      DienBienBenh += `<DIEN_BIEN><![CDATA[${ChisoNoiTru[i].DIEN_BIEN}]]></DIEN_BIEN>`;
      DienBienBenh += `<HOI_CHAN>${ChisoNoiTru[i].HOI_CHAN}</HOI_CHAN>`;
      DienBienBenh += `<PHAU_THUAT>${ChisoNoiTru[i].PHAU_THUAT}</PHAU_THUAT>`;
      DienBienBenh += `<NGAY_YL>${format(
        new Date(this.toIsoString(ChisoNoiTru[i].NGAY_YL)),
        this.getFullDateTimeBHYT,
      )}</NGAY_YL>`;
      DienBienBenh += '</CHI_TIET_DIEN_BIEN_BENH>';
      if (i == ChisoNoiTru.length - 1) {
        DienBienBenh += '</DSACH_CHI_TIET_DIEN_BIEN_BENH>';
      }
    }
    if (base64) {
      DienBienBenh = Buffer.from(DienBienBenh).toString('base64');
    }
    DienBienBenh = `<FILEHOSO><LOAIHOSO>XML5</LOAIHOSO><NOIDUNGFILE>${DienBienBenh}</NOIDUNGFILE></FILEHOSO>`;
    return DienBienBenh;
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
  wait(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }
}
