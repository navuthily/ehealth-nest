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
exports.DmbophanEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const dmphongban_entity_1 = require("../dmphongban/dmphongban.entity");
const user_entity_1 = require("../user/user.entity");
let DmbophanEntity = class DmbophanEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, tenbophan: { required: false, type: () => String }, phongbanId: { required: true, type: () => Number }, createdAt: { required: false, type: () => Date }, updatedAt: { required: false, type: () => Date }, createdBy: { required: false, type: () => Number }, updatedBy: { required: false, type: () => Number }, nguoitao: { required: true, type: () => require("../user/user.entity").UserEntity }, nguoisua: { required: true, type: () => require("../user/user.entity").UserEntity }, nhanviens: { required: true, type: () => [require("../user/user.entity").UserEntity] }, phongban: { required: true, type: () => require("../dmphongban/dmphongban.entity").DmphongbanEntity } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], DmbophanEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ten_bo_phan' }),
    __metadata("design:type", String)
], DmbophanEntity.prototype, "tenbophan", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phong_ban_id' }),
    __metadata("design:type", Number)
], DmbophanEntity.prototype, "phongbanId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        nullable: true,
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], DmbophanEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        nullable: true,
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], DmbophanEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'created_by' }),
    __metadata("design:type", Number)
], DmbophanEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'updated_by' }),
    __metadata("design:type", Number)
], DmbophanEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (nhanvien) => nhanvien.nguoitaobophan),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.UserEntity)
], DmbophanEntity.prototype, "nguoitao", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (nhanvien) => nhanvien.nguoisuabophan),
    (0, typeorm_1.JoinColumn)({ name: 'updated_by' }),
    __metadata("design:type", user_entity_1.UserEntity)
], DmbophanEntity.prototype, "nguoisua", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.UserEntity, (nhanvien) => nhanvien.dmbophan),
    __metadata("design:type", Array)
], DmbophanEntity.prototype, "nhanviens", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dmphongban_entity_1.DmphongbanEntity, (pb) => pb.bophans),
    (0, typeorm_1.JoinColumn)({ name: 'phong_ban_id' }),
    __metadata("design:type", dmphongban_entity_1.DmphongbanEntity)
], DmbophanEntity.prototype, "phongban", void 0);
DmbophanEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'bophan' })
], DmbophanEntity);
exports.DmbophanEntity = DmbophanEntity;
//# sourceMappingURL=dmbophan.entity.js.map