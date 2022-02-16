import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Job } from 'bull';
import { Connection } from 'typeorm';

@Processor('quanly_appbenhnhan')
@Injectable()
export class GoiKhamChiTietAppBenhNhanLoaiKhamChiTietProcessor {
  constructor(
    @InjectConnection() readonly connection: Connection,
  ) { }

  @Process('updateGoiKhamStuff')
  async updateGoiKhamStuff(job: Job) {
    const { ID_GoiKham } = job.data;
    const dataTenLoaiKham = job.data.dataTenLoaiKham.length != 0 ? job.data.dataTenLoaiKham : null;
    const dataYNghia = job.data.dataYNghia.length != 0 ? job.data.dataYNghia : null;
    const dataNoiDungLoiKhuyen = job.data.dataNoiDungLoiKhuyen.length != 0 ? job.data.dataNoiDungLoiKhuyen : null;

    await this.connection.query(`
      UPDATE GoiKham
      SET tenloaikham_dm_loaikham = @0,
          ynghia_dm_loaikham = @1,
          noidungloikhuyen_gd2_danhmuc_loikhuyen = @2
      where GoiKham.ID_GoiKham = @3
    `, [dataTenLoaiKham, dataYNghia, dataNoiDungLoiKhuyen, ID_GoiKham])
  }
}
