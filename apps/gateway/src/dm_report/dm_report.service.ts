import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class DMReportService {
  constructor(@InjectConnection() readonly connection: Connection) {}
  async get_all() {
    const stored = `
    SET NOCOUNT ON;
    SELECT dm_report.*, nv1.NickName AS nguoi_tao, nv2.NickName AS nguoi_sua
    FROM dm_report
    JOIN dm_nhanvien nv1 ON dm_report.created_by = nv1.ID_NhanVien
    LEFT JOIN dm_nhanvien nv2 ON dm_report.updated_by = nv2.ID_NhanVien
    `;
    const dataResponse = await this.connection.query(`${stored}`);
    dataResponse.map((item: any) => {
      item['id'] = item['ID_LoaiKham'];
      return item;
    });
    return dataResponse;
  }
  async get_url_report(data: any) {
    const { report_type, ref_id, ref_type } = data;
    const stored = `
    SET NOCOUNT ON
    DECLARE @report_type NVARCHAR(50) = @0
    DECLARE @ref_id INT = @1
    DECLARE @ref_type NVARCHAR(250) = @2
    IF EXISTS (SELECT 1 FROM report_kham WHERE report_type = @report_type AND ref_id = @ref_id AND ref_type = @ref_type)
      SELECT report_kham.[url], 0 is_regex_url FROM report_kham WHERE report_type = @report_type AND ref_id = @ref_id AND ref_type = @ref_type
    ELSE
      SELECT TOP 1 dm_report.[url], 1 is_regex_url FROM dm_report where dm_report.report_type = @report_type and dm_report.is_active = 1
    `;
    const dataResponse = await this.connection.query(stored, [
      report_type,
      ref_id,
      ref_type,
    ]);
    return dataResponse;
  }
}
