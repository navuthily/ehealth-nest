import {
  BeforeCreateOne,
  BeforeUpdateOne,
CreateOneInputType,
FilterableField,
PagingStrategies,
QueryOptions,
UpdateOneInputType,
} from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractUserInput } from '@libs/common/dto/abstract-user.input';
import { UserContext } from '../../auth/auth.interfaces';

import { AbstractDto } from '@libs/common/dto/abstract.dto';
import type { UserEntity } from '../user.entity';

export type UserDtoOptions = Partial<{ isActive: boolean }>;

@ObjectType('User')
@QueryOptions({
pagingStrategy: PagingStrategies.OFFSET,
maxResultsSize: 1000000,
defaultResultSize: 1000000,
enableTotalCount: false,
})

export class UserDto extends AbstractDto {
@FilterableField({ nullable: true })
createdBy?: string;

@FilterableField({ nullable: true })
updatedBy?: string;

@FilterableField({ nullable: true })
donviId?: number;

@FilterableField({ nullable: true })
bophanId?: number;

@FilterableField({ nullable: true })
phongbanId?: number;

@FilterableField({ nullable: true })
holotNhanVien?: string;

@FilterableField({ nullable: true })
tennhanvien?: string;

@FilterableField({ nullable: true })
hinhNhanVien?: string;

@FilterableField({ nullable: true })
gioitinh?: boolean;

@FilterableField({ nullable: true })
dantocId?: number;

@FilterableField({ nullable: true })
quoctichId?: number;

@FilterableField({ nullable: true })
cmnd?: string;

@FilterableField({ nullable: true })
hochieu?: string;

@FilterableField({ nullable: true })
chucvuId?: number;

@FilterableField({ nullable: true })
chucdanhId?: number;

@FilterableField({ nullable: true })
diachi?: string;

@FilterableField({ nullable: true })
mobile?: string;

@FilterableField({ nullable: true })
homePhone?: string;

@FilterableField({ nullable: true })
email?: string;

@FilterableField({ nullable: true })
yahooId?: string;

@FilterableField({ nullable: true })
skypeId?: string;

@FilterableField({ nullable: true })
ngaysinh?: Date;

@FilterableField({ nullable: true })
ngayvaolam?: Date;

@FilterableField({ nullable: true })
trinhdoId?: number;

@FilterableField({ nullable: true })
loaitinhluongId?: number;

@FilterableField({ nullable: true })
chamcongbangmay?: boolean;

@FilterableField({ nullable: true })
taikhoanNganHang?: string;

@FilterableField({ nullable: true })
nganhangId?: number;

@FilterableField({ nullable: true })
masothuecanhan?: string;

@FilterableField({ nullable: true })
sobaohiem?: string;

@FilterableField({ nullable: true })
ghichu?: string;

@FilterableField({ nullable: true })
danghiviec?: boolean;

@FilterableField({ nullable: true })
hinhchuky?: string;

@FilterableField({ nullable: true })
isDoctor?: boolean;

@FilterableField({ nullable: true })
isCongTacVienBenNgoai?: boolean;

@FilterableField({ nullable: true })
allowLogin?: boolean;

@FilterableField({ nullable: true })
nickname?: string;

@FilterableField({ nullable: true })
extfield1?: boolean;

@FilterableField({ nullable: true })
extfield2?: boolean;

@FilterableField({ nullable: true })
username?: string;

@FilterableField({ nullable: true })
password: string;

@FilterableField({ nullable: true })
hideLich?: boolean;

@FilterableField({ nullable: true })
ngaycapCMND?: Date;

@FilterableField({ nullable: true })
nhomLSPId?: number;

@FilterableField({ nullable: true })
manhanvien?: number;

@FilterableField({ nullable: true })
isCoHuu?: boolean;

@FilterableField({ nullable: true })
bsdaidienId?: number;

@FilterableField({ nullable: true })
ngonngu?: number;

@FilterableField({ nullable: true })
passwordProtect?: string;

@FilterableField({ nullable: true })
kinhnghiem?: Date;

@FilterableField({ nullable: true })
createOn?: Date;

@FilterableField({ nullable: true })
coTinhLuongKeToan?: boolean;

@FilterableField({ nullable: true })
hopdongId?: number;

@FilterableField({ nullable: true })
ngaybatdauHopDong?: Date;

@FilterableField({ nullable: true })
ngayketthucHopDong?: Date;

@FilterableField({ nullable: true })
goibenhId?: number;

@FilterableField({ nullable: true })
chuyenkhoaId?: number;

@FilterableField({ nullable: true })
tinhtranghonnhanId?: number;

@FilterableField({ nullable: true })
noicapCMND?: number;

@FilterableField({ nullable: true })
ghichu1?: string;

@FilterableField({ nullable: true })
chungchihanhnghe?: boolean;

@FilterableField({ nullable: true })
ngaynghiviec?: Date;

@FilterableField({ nullable: true })
isLichBacSy?: boolean;

@FilterableField({ nullable: true })
soChungChiHanhNghe?: string;

@FilterableField({ nullable: true })
noicapChungChiHanhNghe?: number;

@FilterableField({ nullable: true })
ngaycapChungChiHanhNghe?: Date;

@FilterableField({ nullable: true })
phamvihoatdongChungChiHanhNghe?: number;

@FilterableField({ nullable: true })
noidaotao?: number;

@FilterableField({ nullable: true })
nguoiduyetdonId?: number;

@FilterableField({ nullable: true })
nhomAnhVanId?: number;

@FilterableField({ nullable: true })
phamviHanhNgheBoSung?: number;

@FilterableField({ nullable: true })
ngayganbo?: Date;

@FilterableField({ nullable: true })
passwordOLD?: string;

@FilterableField({ nullable: true })
chucvukhacId?: number;

@FilterableField({ nullable: true })
muchamdiemId?: number;

@FilterableField({ nullable: true })
rememberToken?: string;

@FilterableField({ nullable: true })
accessToken?: string;

@FilterableField({ nullable: true })
expireToken?: string;

@FilterableField({ nullable: true })
apiToken?: string;

@FilterableField({ nullable: true })
appPassWord?: string;

@FilterableField({ nullable: true })
nhomLSPDeNghiId?: number;

@FilterableField({ nullable: true })
loaikhoiId?: number;

@FilterableField({ nullable: true })
hesodiemNN?: number;

@FilterableField({ nullable: true })
ghichuReview?: string;

@FilterableField({ nullable: true })
ghichuPhongVan?: string;

@FilterableField({ nullable: true })
isLuongLSP?: boolean;
@FilterableField({ nullable: true })
role: string;
// Sử dụng khi gọi .toDto()
constructor(user: UserEntity, options?: UserDtoOptions) {
  super(user);
  this.username = user?.username;
  this.nickname = user?.nickname;
  this.holotNhanVien = user?.holotNhanVien;
  this.tennhanvien = user?.tennhanvien;
  this.phongbanId = user?.phongbanId;
  // this.isActive = options?.isActive;
}
}
