import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Job, Queue } from 'bull';
import { Connection } from 'typeorm';
import { ThuocService } from './thuoc.service';

@Processor('thuoc')
@Injectable()
export class ThuocProcessor {
  constructor(
    private thuocService: ThuocService,
    @InjectConnection() readonly connection: Connection,
    @InjectQueue('thuoc') private readonly thuocQueue: Queue,
  ) {}

  @Process('xuatthuoc')
  async xuatthuoc(job: Job) {
    const startTime = new Date();
    const result = await this.thuocService.exec_gd2_get_cauhinh_new(
      job.data.ip,
    );
    if (result.length == 0)
      return JSON.stringify({
        check: 1,
        oke: `IP:${job.data.ip} chưa được cấu hình kho xuất`,
      });

    const data = {
      id_luotkham: job.data.dataBody.id_donthuoc,
      id_donthuoc: null,
      id_kham: null,
      id_phy: null,
      id_dtph: null,
      id_user: null,
      id_benhnhan: null,
      sid: null,
      loaikiemtra: 29,
      ip_client: job.data.ip,
    };
    const khoa = await this.thuocService.exec_gd2_quanly_dieukienupdate(data);
    if (khoa[0].Isupdate == 0)
      return JSON.stringify({ check: 1, oke: khoa[0].Chuoi });

    const inputData = {
      xml: `<data><column>ID_DonThuoc</column><value>${job.data.dataBody.id_donthuoc}</value></data>`,
      IP: job.data.ip,
      ID_Kho: null,
      ID_NhanVien: job.data.dataBody.id_user,
      out: null,
      ID_XuatKho: 0,
    };
    const dataXuatThuoc = await this.thuocService.exec_gd2_thuoc_quanlyxuat(
      inputData,
    );
    if (dataXuatThuoc.output.ID_XuatKho === null) {
      const table = this.thuocService.createTable(dataXuatThuoc.recordset);
      console.log({
        check: 1,
        ip: job.data.ip,
        id_donthuoc: job.data.dataBody.id_donthuoc,
        startTime,
        endTime: new Date(),
      });
      return JSON.stringify({ check: 1, oke: table });
    }
    console.log({
      check: 0,
      ip: job.data.ip,
      id_donthuoc: job.data.dataBody.id_donthuoc,
      startTime,
      endTime: new Date(),
    });
    return JSON.stringify({
      check: 0,
      oke: dataXuatThuoc.output.ID_XuatKho,
    });
  }

  @Process('xuatdieuchuyen')
  async xuatdieuchuyen(job: Job) {
    const xml = `<data><column>ID_PhieuXuatNoiBo</column><value>${job.data.dataBody.ID_PhieuXuatNoiBo}</value></data>`;
    const data = {
      function: 'GD2_QuanLy_40',
      xml,
    };
    const khoa = await this.thuocService.exec_gd2_quanlydieukienupdatenew(data);
    if (khoa[0].Isupdate === 0) {
      return JSON.stringify({ check: 1, oke: khoa[0].Chuoi });
    }
    const inputData = {
      xml: `<data><column>ID_PhieuXuatNoiBo</column><value>${job.data.dataBody.ID_PhieuXuatNoiBo}</value></data>`,
      IP: job.data.ip,
      ID_Kho: null,
      ID_NhanVien: job.data.dataBody.id_user,
      out: null,
      ID_XuatKho: 0,
    };
    const dataXuatThuoc = await this.thuocService.exec_gd2_thuoc_quanlyxuat(
      inputData,
    );
    if (dataXuatThuoc.output.ID_XuatKho === null) {
      const table = this.thuocService.createTable(dataXuatThuoc.recordset);
      return JSON.stringify({ check: 1, oke: table });
    }
    return JSON.stringify({
      check: 0,
      oke: dataXuatThuoc.output.ID_XuatKho,
    });
  }

  @Process('xuatnoitru')
  async xuatnoitru(job: Job) {
    const { ID_Kho, ID_PhieuLinhThuoc, ID_NhanVien } = job.data.dataBody;
    const data = { ID_PhieuLinhThuoc };
    const khoa = await this.thuocService.exec_gd2_check_phieulinhthuocnoitru(
      data,
    );
    if (khoa[0].Dem == 1) {
      return JSON.stringify({ check: 1, oke: 'Phiếu Đã Xuất' });
    }
    const inputData = {
      xml: `<data><column>ID_PhieuLinh</column><value>${ID_PhieuLinhThuoc}</value></data>`,
      IP: job.data.ip,
      ID_Kho,
      ID_NhanVien,
      out: null,
      ID_XuatKho: 0,
    };
    const dataXuatThuoc = await this.thuocService.exec_gd2_thuoc_quanlyxuat(
      inputData,
    );
    if (dataXuatThuoc.output.ID_XuatKho === null) {
      const table = this.thuocService.createTable(dataXuatThuoc.recordset);
      return JSON.stringify({ check: 1, oke: table });
    }
    return JSON.stringify({ check: 0, oke: dataXuatThuoc.output.ID_XuatKho });
  }

  @Process('xuatthuoctralainhacungcap')
  async xuatthuoctralainhacungcap(job: Job) {
    const { ID_PhieuTrungGian, ID_NhanVien } = job.data.dataBody;
    const data = { ID_PhieuTrungGian };
    const khoa =
      await this.thuocService.exec_gd2_checkphieunhapxuattrunggian_daduyet(
        data,
      );
    if (khoa[0].ID_NguoiDuyetXuat !== null)
      return JSON.stringify({ check: 1, oke: 'Phiếu Đã Xuất' });
    const ID_Kho = khoa[0].ID_KhoXuat;
    const inputData = {
      xml: `<data><column>ID_PhieuTrungGian_TraNhaCC</column><value>${ID_PhieuTrungGian}</value></data>`,
      IP: job.data.dataBody.IP,
      ID_Kho,
      ID_NhanVien,
    };
    const dataXuatThuoc = await this.thuocService.exec_gd2_thuoc_quanlyxuat(
      inputData,
    );
    if (dataXuatThuoc.output.ID_XuatKho === null) {
      const table = this.thuocService.createTable(dataXuatThuoc.recordset);
      return JSON.stringify({ check: 1, oke: table });
    }
    return JSON.stringify({ check: 0, oke: dataXuatThuoc.output.ID_XuatKho });
  }

  @Process('xuathuythuoc')
  async xuathuythuoc(job: Job) {
    const { ID_PhieuTrungGian, ID_NhanVien } = job.data.dataBody;
    const data = { ID_PhieuTrungGian };
    const khoa =
      await this.thuocService.exec_gd2_checkphieunhapxuattrunggian_daduyet(
        data,
      );
    if (khoa[0].ID_NguoiDuyetXuat !== null)
      return JSON.stringify({ check: 1, oke: 'Phiếu Đã Xuất' });
    const ID_Kho = khoa[0].ID_KhoXuat;
    const inputData = {
      xml: `<data><column>ID_PhieuTrungGian_HuyThuoc</column><value>${ID_PhieuTrungGian}</value></data>`,
      IP: job.data.dataBody.IP,
      ID_Kho,
      ID_NhanVien,
    };
    const dataXuatThuoc = await this.thuocService.exec_gd2_thuoc_quanlyxuat(
      inputData,
    );
    if (dataXuatThuoc.output.ID_XuatKho === null) {
      const table = this.thuocService.createTable(dataXuatThuoc.recordset);
      return JSON.stringify({ check: 1, oke: table });
    }
    return JSON.stringify({ check: 0, oke: dataXuatThuoc.output.ID_XuatKho });
  }
}
