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
exports.DmloaihopdongEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const nhanvienhopdong_entity_1 = require("../nhanvienhopdong/nhanvienhopdong.entity");
const user_entity_1 = require("../user/user.entity");
let DmloaihopdongEntity = class DmloaihopdongEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, tenloaihopdong: { required: false, type: () => String }, createdAt: { required: false, type: () => Date }, updatedAt: { required: false, type: () => Date }, nguoitao: { required: true, type: () => require("../user/user.entity").UserEntity }, nguoisua: { required: true, type: () => require("../user/user.entity").UserEntity }, nhanvienhopdongs: { required: true, type: () => [require("../nhanvienhopdong/nhanvienhopdong.entity").NhanvienhopdongEntity] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], DmloaihopdongEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ten_loai_hop_dong' }),
    __metadata("design:type", String)
], DmloaihopdongEntity.prototype, "tenloaihopdong", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        nullable: true,
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], DmloaihopdongEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        nullable: true,
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], DmloaihopdongEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (nhanvien) => nhanvien.nguoitaoloaihopdong),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.UserEntity)
], DmloaihopdongEntity.prototype, "nguoitao", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (nhanvien) => nhanvien.nguoisualoaihopdong),
    (0, typeorm_1.JoinColumn)({ name: 'updated_by' }),
    __metadata("design:type", user_entity_1.UserEntity)
], DmloaihopdongEntity.prototype, "nguoisua", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nhanvienhopdong_entity_1.NhanvienhopdongEntity, (nhanvienhopdong) => nhanvienhopdong.loaihopdong),
    __metadata("design:type", Array)
], DmloaihopdongEntity.prototype, "nhanvienhopdongs", void 0);
DmloaihopdongEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'loaihopdong' })
], DmloaihopdongEntity);
exports.DmloaihopdongEntity = DmloaihopdongEntity;
//# sourceMappingURL=dmloaihopdong.entity.js.map