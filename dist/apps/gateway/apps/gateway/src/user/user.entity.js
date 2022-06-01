"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../../libs/common/abstract.entity");
const use_dto_decorator_1 = require("../../../../libs/decorators/use-dto.decorator");
const user_dto_1 = require("./dto/user-dto");
const chucvu_entity_1 = require("../chucvu/chucvu.entity");
const chucdanh_entity_1 = require("../chucdanh/chucdanh.entity");
const dmtrinhdo_entity_1 = require("../dmtrinhdo/dmtrinhdo.entity");
const dmloaitinhluong_entity_1 = require("../dmloaitinhluong/dmloaitinhluong.entity");
const dmbophan_entity_1 = require("../dmbophan/dmbophan.entity");
const dmphongban_entity_1 = require("../dmphongban/dmphongban.entity");
const dmloaikhoi_entity_1 = require("../dmloaikhoi/dmloaikhoi.entity");
const nhanvienhopdong_entity_1 = require("../nhanvienhopdong/nhanvienhopdong.entity");
const chuyenkhoa_entity_1 = require("../chuyenkhoa/chuyenkhoa.entity");
const templatehd_entity_1 = require("../templatehd/templatehd.entity");
const dmloaihopdong_entity_1 = require("../dmloaihopdong/dmloaihopdong.entity");
let UserEntity = class UserEntity extends abstract_entity_1.AbstractEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { holotNhanVien: { required: false, type: () => String }, tennhanvien: { required: false, type: () => String }, nickname: { required: false, type: () => String }, mobile: { required: false, type: () => String }, hinhNhanVien: { required: false, type: () => String }, gioitinh: { required: false, type: () => Boolean }, quoctich: { required: false, type: () => String }, cmnd: { required: false, type: () => String }, ngaycapcmnd: { required: false, type: () => Date }, noicapcmnd: { required: false, type: () => String }, hochieu: { required: false, type: () => String }, diachi: { required: false, type: () => String }, email: { required: true, type: () => String }, ngaysinh: { required: false, type: () => Date }, ngayvaolam: { required: false, type: () => Date }, ngaynghiviec: { required: false, type: () => Date }, masothuecanhan: { required: false, type: () => String }, sobaohiem: { required: false, type: () => String }, hinhchuky: { required: false, type: () => String }, allowLogin: { required: false, type: () => Boolean }, password: { required: false, type: () => String }, role: { required: true, type: () => String }, trinhdoId: { required: false, type: () => Number }, bophanId: { required: false, type: () => Number }, chucvuId: { required: false, type: () => Number }, chucdanhId: { required: false, type: () => Number }, loaitinhluongId: { required: false, type: () => Number }, chuyenkhoaId: { required: false, type: () => Number }, loaikhoiId: { required: false, type: () => Number }, createdBy: { required: false, type: () => Number }, updatedBy: { required: false, type: () => Number }, chucvu: { required: true, type: () => require("../chucvu/chucvu.entity").ChucvuEntity }, chucdanh: { required: true, type: () => require("../chucdanh/chucdanh.entity").ChucdanhEntity }, dmtrinhdo: { required: true, type: () => require("../dmtrinhdo/dmtrinhdo.entity").DmtrinhdoEntity }, dmloaitinhluong: { required: true, type: () => require("../dmloaitinhluong/dmloaitinhluong.entity").DmloaitinhluongEntity }, dmbophan: { required: true, type: () => require("../dmbophan/dmbophan.entity").DmbophanEntity }, dmloaikhoi: { required: true, type: () => require("../dmloaikhoi/dmloaikhoi.entity").DmloaikhoiEntity }, chuyenkhoa: { required: true, type: () => require("../chuyenkhoa/chuyenkhoa.entity").ChuyenkhoaEntity }, nhanvienhopdongs: { required: true, type: () => [require("../nhanvienhopdong/nhanvienhopdong.entity").NhanvienhopdongEntity] }, temps: { required: true, type: () => [require("../templatehd/templatehd.entity").TemplateHdEntity] }, temp: { required: true, type: () => [require("../templatehd/templatehd.entity").TemplateHdEntity] }, nhanvienhd: { required: true, type: () => [require("../nhanvienhopdong/nhanvienhopdong.entity").NhanvienhopdongEntity] }, nhanvienhopdong: { required: true, type: () => [require("../nhanvienhopdong/nhanvienhopdong.entity").NhanvienhopdongEntity] }, nguoitaochucvu: { required: true, type: () => [require("../chucvu/chucvu.entity").ChucvuEntity] }, nguoisuachucvu: { required: true, type: () => [require("../chucvu/chucvu.entity").ChucvuEntity] }, nguoitaochucdanh: { required: true, type: () => [require("../chucdanh/chucdanh.entity").ChucdanhEntity] }, nguoisuachucdanh: { required: true, type: () => [require("../chucdanh/chucdanh.entity").ChucdanhEntity] }, nguoitaochuyenkhoa: { required: true, type: () => [require("../chuyenkhoa/chuyenkhoa.entity").ChuyenkhoaEntity] }, nguoisuachuyenkhoa: { required: true, type: () => [require("../chuyenkhoa/chuyenkhoa.entity").ChuyenkhoaEntity] }, nguoitaobophan: { required: true, type: () => [require("../dmbophan/dmbophan.entity").DmbophanEntity] }, nguoisuabophan: { required: true, type: () => [require("../dmbophan/dmbophan.entity").DmbophanEntity] }, nguoitaoloaihopdong: { required: true, type: () => [require("../dmloaihopdong/dmloaihopdong.entity").DmloaihopdongEntity] }, nguoisualoaihopdong: { required: true, type: () => [require("../dmloaihopdong/dmloaihopdong.entity").DmloaihopdongEntity] }, nguoitaoloaikhoi: { required: true, type: () => [require("../dmloaikhoi/dmloaikhoi.entity").DmloaikhoiEntity] }, nguoisualoaikhoi: { required: true, type: () => [require("../dmloaikhoi/dmloaikhoi.entity").DmloaikhoiEntity] }, nguoitaoloaitinhluong: { required: true, type: () => [require("../dmloaitinhluong/dmloaitinhluong.entity").DmloaitinhluongEntity] }, nguoisualoaitinhluong: { required: true, type: () => [require("../dmloaitinhluong/dmloaitinhluong.entity").DmloaitinhluongEntity] }, nguoitaophongban: { required: true, type: () => [require("../dmphongban/dmphongban.entity").DmphongbanEntity] }, nguoisuaphongban: { required: true, type: () => [require("../dmphongban/dmphongban.entity").DmphongbanEntity] }, nguoitaotrinhdo: { required: true, type: () => [require("../dmtrinhdo/dmtrinhdo.entity").DmtrinhdoEntity] }, nguoisuatrinhdo: { required: true, type: () => [require("../dmtrinhdo/dmtrinhdo.entity").DmtrinhdoEntity] } };
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'ho_lot' }),
    __metadata("design:type", String)
], UserEntity.prototype, "holotNhanVien", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'ten' }),
    __metadata("design:type", String)
], UserEntity.prototype, "tennhanvien", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'nickname' }),
    __metadata("design:type", String)
], UserEntity.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'so_dien_thoai' }),
    __metadata("design:type", String)
], UserEntity.prototype, "mobile", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'hinh_nhan_vien' }),
    __metadata("design:type", String)
], UserEntity.prototype, "hinhNhanVien", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'gioi_tinh' }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "gioitinh", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'quoc_tich' }),
    __metadata("design:type", String)
], UserEntity.prototype, "quoctich", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'CMND' }),
    __metadata("design:type", String)
], UserEntity.prototype, "cmnd", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'ngay_cap_CMND' }),
    __metadata("design:type", Date)
], UserEntity.prototype, "ngaycapcmnd", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'noi_cap_CMND' }),
    __metadata("design:type", String)
], UserEntity.prototype, "noicapcmnd", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'ho_chieu' }),
    __metadata("design:type", String)
], UserEntity.prototype, "hochieu", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'dia_chi' }),
    __metadata("design:type", String)
], UserEntity.prototype, "diachi", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'email' }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'ngay_sinh' }),
    __metadata("design:type", Date)
], UserEntity.prototype, "ngaysinh", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'ngay_vao_lam' }),
    __metadata("design:type", Date)
], UserEntity.prototype, "ngayvaolam", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'ngay_nghi_viec' }),
    __metadata("design:type", Date)
], UserEntity.prototype, "ngaynghiviec", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'ma_so_thue_ca_nhan' }),
    __metadata("design:type", String)
], UserEntity.prototype, "masothuecanhan", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'so_bao_hiem' }),
    __metadata("design:type", String)
], UserEntity.prototype, "sobaohiem", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'hinh_chu_ky' }),
    __metadata("design:type", String)
], UserEntity.prototype, "hinhchuky", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'allow_login' }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "allowLogin", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'password' }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'role', default: 'USER' }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'trinh_do_id' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "trinhdoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'bo_phan_id' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "bophanId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'chuc_vu_id' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "chucvuId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'chuc_danh_id' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "chucdanhId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'loai_tinh_luong_id' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "loaitinhluongId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'chuyen_khoa_id' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "chuyenkhoaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'loai_khoi_id' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "loaikhoiId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'created_by' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'updated_by' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chucvu_entity_1.ChucvuEntity, (chucvu) => chucvu.nhanviens),
    (0, typeorm_1.JoinColumn)({ name: 'chuc_vu_id' }),
    __metadata("design:type", chucvu_entity_1.ChucvuEntity)
], UserEntity.prototype, "chucvu", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chucdanh_entity_1.ChucdanhEntity, (chucdanh) => chucdanh.nhanviens),
    (0, typeorm_1.JoinColumn)({ name: 'chuc_danh_id' }),
    __metadata("design:type", chucdanh_entity_1.ChucdanhEntity)
], UserEntity.prototype, "chucdanh", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dmtrinhdo_entity_1.DmtrinhdoEntity, (dmtrinhdo) => dmtrinhdo.nhanviens),
    (0, typeorm_1.JoinColumn)({ name: 'trinh_do_id' }),
    __metadata("design:type", dmtrinhdo_entity_1.DmtrinhdoEntity)
], UserEntity.prototype, "dmtrinhdo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dmloaitinhluong_entity_1.DmloaitinhluongEntity, (dmloaitinhluong) => dmloaitinhluong.nhanviens),
    (0, typeorm_1.JoinColumn)({ name: 'loai_tinh_luong_id' }),
    __metadata("design:type", dmloaitinhluong_entity_1.DmloaitinhluongEntity)
], UserEntity.prototype, "dmloaitinhluong", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dmbophan_entity_1.DmbophanEntity, (dmbophan) => dmbophan.nhanviens),
    (0, typeorm_1.JoinColumn)({ name: 'bo_phan_id' }),
    __metadata("design:type", dmbophan_entity_1.DmbophanEntity)
], UserEntity.prototype, "dmbophan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dmloaikhoi_entity_1.DmloaikhoiEntity, (dmloaikhoi) => dmloaikhoi.nhanviens),
    (0, typeorm_1.JoinColumn)({ name: 'loai_khoi_id' }),
    __metadata("design:type", dmloaikhoi_entity_1.DmloaikhoiEntity)
], UserEntity.prototype, "dmloaikhoi", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chuyenkhoa_entity_1.ChuyenkhoaEntity, (chuyenkhoa) => chuyenkhoa.nhanviens),
    (0, typeorm_1.JoinColumn)({ name: 'chuyen_khoa_id' }),
    __metadata("design:type", chuyenkhoa_entity_1.ChuyenkhoaEntity)
], UserEntity.prototype, "chuyenkhoa", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nhanvienhopdong_entity_1.NhanvienhopdongEntity, (nhanvienhopdongs) => nhanvienhopdongs.nhanvien),
    __metadata("design:type", Array)
], UserEntity.prototype, "nhanvienhopdongs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => templatehd_entity_1.TemplateHdEntity, (temp) => temp.nguoitao),
    __metadata("design:type", Array)
], UserEntity.prototype, "temps", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => templatehd_entity_1.TemplateHdEntity, (temp) => temp.nguoisua),
    __metadata("design:type", Array)
], UserEntity.prototype, "temp", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nhanvienhopdong_entity_1.NhanvienhopdongEntity, (nhanvienhd) => nhanvienhd.nguoitao),
    __metadata("design:type", Array)
], UserEntity.prototype, "nhanvienhd", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nhanvienhopdong_entity_1.NhanvienhopdongEntity, (nhanvienhopdong) => nhanvienhopdong.nguoisua),
    __metadata("design:type", Array)
], UserEntity.prototype, "nhanvienhopdong", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chucvu_entity_1.ChucvuEntity, (cv) => cv.nguoitao),
    __metadata("design:type", Array)
], UserEntity.prototype, "nguoitaochucvu", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chucvu_entity_1.ChucvuEntity, (cv) => cv.nguoisua),
    __metadata("design:type", Array)
], UserEntity.prototype, "nguoisuachucvu", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chucdanh_entity_1.ChucdanhEntity, (cd) => cd.nguoitao),
    __metadata("design:type", Array)
], UserEntity.prototype, "nguoitaochucdanh", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chucdanh_entity_1.ChucdanhEntity, (cd) => cd.nguoisua),
    __metadata("design:type", Array)
], UserEntity.prototype, "nguoisuachucdanh", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chuyenkhoa_entity_1.ChuyenkhoaEntity, (cv) => cv.nguoitao),
    __metadata("design:type", Array)
], UserEntity.prototype, "nguoitaochuyenkhoa", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chuyenkhoa_entity_1.ChuyenkhoaEntity, (cv) => cv.nguoisua),
    __metadata("design:type", Array)
], UserEntity.prototype, "nguoisuachuyenkhoa", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dmbophan_entity_1.DmbophanEntity, (cd) => cd.nguoitao),
    __metadata("design:type", Array)
], UserEntity.prototype, "nguoitaobophan", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dmbophan_entity_1.DmbophanEntity, (cd) => cd.nguoisua),
    __metadata("design:type", Array)
], UserEntity.prototype, "nguoisuabophan", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dmloaihopdong_entity_1.DmloaihopdongEntity, (cd) => cd.nguoitao),
    __metadata("design:type", Array)
], UserEntity.prototype, "nguoitaoloaihopdong", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dmloaihopdong_entity_1.DmloaihopdongEntity, (cd) => cd.nguoisua),
    __metadata("design:type", Array)
], UserEntity.prototype, "nguoisualoaihopdong", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dmloaikhoi_entity_1.DmloaikhoiEntity, (cd) => cd.nguoitao),
    __metadata("design:type", Array)
], UserEntity.prototype, "nguoitaoloaikhoi", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dmloaikhoi_entity_1.DmloaikhoiEntity, (cd) => cd.nguoisua),
    __metadata("design:type", Array)
], UserEntity.prototype, "nguoisualoaikhoi", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dmloaitinhluong_entity_1.DmloaitinhluongEntity, (cd) => cd.nguoitao),
    __metadata("design:type", Array)
], UserEntity.prototype, "nguoitaoloaitinhluong", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dmloaitinhluong_entity_1.DmloaitinhluongEntity, (cd) => cd.nguoisua),
    __metadata("design:type", Array)
], UserEntity.prototype, "nguoisualoaitinhluong", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dmphongban_entity_1.DmphongbanEntity, (cd) => cd.nguoitao),
    __metadata("design:type", Array)
], UserEntity.prototype, "nguoitaophongban", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dmphongban_entity_1.DmphongbanEntity, (cd) => cd.nguoisua),
    __metadata("design:type", Array)
], UserEntity.prototype, "nguoisuaphongban", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dmtrinhdo_entity_1.DmtrinhdoEntity, (cd) => cd.nguoitao),
    __metadata("design:type", Array)
], UserEntity.prototype, "nguoitaotrinhdo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dmtrinhdo_entity_1.DmtrinhdoEntity, (cd) => cd.nguoisua),
    __metadata("design:type", Array)
], UserEntity.prototype, "nguoisuatrinhdo", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'nhanvien' }),
    (0, use_dto_decorator_1.UseDto)(user_dto_1.UserDto)
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map