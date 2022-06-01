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
exports.NhanvienhopdongEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const dmloaihopdong_entity_1 = require("../dmloaihopdong/dmloaihopdong.entity");
const user_entity_1 = require("../user/user.entity");
let NhanvienhopdongEntity = class NhanvienhopdongEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, nhanvienId: { required: true, type: () => Number }, loaihopdongId: { required: true, type: () => Number }, noidunghopdong: { required: false, type: () => String }, ngaybatdauhopdong: { required: true, type: () => Date }, ngayketthuchopdong: { required: true, type: () => Date }, ghichu: { required: true, type: () => String }, createdBy: { required: false, type: () => Number }, updatedBy: { required: false, type: () => Number }, createdAt: { required: false, type: () => Date }, updatedAt: { required: false, type: () => Date }, nguoitao: { required: true, type: () => require("../user/user.entity").UserEntity }, nguoisua: { required: true, type: () => require("../user/user.entity").UserEntity }, nhanvien: { required: true, type: () => require("../user/user.entity").UserEntity }, loaihopdong: { required: true, type: () => require("../dmloaihopdong/dmloaihopdong.entity").DmloaihopdongEntity } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], NhanvienhopdongEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'nhanvien_id' }),
    __metadata("design:type", Number)
], NhanvienhopdongEntity.prototype, "nhanvienId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'loai_hop_dong_id' }),
    __metadata("design:type", Number)
], NhanvienhopdongEntity.prototype, "loaihopdongId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        name: 'noi_dung',
        type: 'text',
    }),
    __metadata("design:type", String)
], NhanvienhopdongEntity.prototype, "noidunghopdong", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'ngay_bat_dau' }),
    __metadata("design:type", Date)
], NhanvienhopdongEntity.prototype, "ngaybatdauhopdong", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'ngay_ket_thuc' }),
    __metadata("design:type", Date)
], NhanvienhopdongEntity.prototype, "ngayketthuchopdong", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'ghi_chu' }),
    __metadata("design:type", String)
], NhanvienhopdongEntity.prototype, "ghichu", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'created_by' }),
    __metadata("design:type", Number)
], NhanvienhopdongEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'updated_by' }),
    __metadata("design:type", Number)
], NhanvienhopdongEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        nullable: true,
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], NhanvienhopdongEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        nullable: true,
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], NhanvienhopdongEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (nhanvien) => nhanvien.nhanvienhopdongs),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.UserEntity)
], NhanvienhopdongEntity.prototype, "nguoitao", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (nhanvien) => nhanvien.nhanvienhopdong),
    (0, typeorm_1.JoinColumn)({ name: 'updated_by' }),
    __metadata("design:type", user_entity_1.UserEntity)
], NhanvienhopdongEntity.prototype, "nguoisua", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (nhanvien) => nhanvien.nhanvienhd),
    (0, typeorm_1.JoinColumn)({ name: 'nhanvien_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], NhanvienhopdongEntity.prototype, "nhanvien", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dmloaihopdong_entity_1.DmloaihopdongEntity, (loaihopdong) => loaihopdong.nhanvienhopdongs),
    (0, typeorm_1.JoinColumn)({ name: 'loai_hop_dong_id' }),
    __metadata("design:type", dmloaihopdong_entity_1.DmloaihopdongEntity)
], NhanvienhopdongEntity.prototype, "loaihopdong", void 0);
NhanvienhopdongEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'nhanvienhopdong' })
], NhanvienhopdongEntity);
exports.NhanvienhopdongEntity = NhanvienhopdongEntity;
//# sourceMappingURL=nhanvienhopdong.entity.js.map