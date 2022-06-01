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
exports.TemplateHdEntity = void 0;
const openapi = require("@nestjs/swagger");
const abstract_entity_1 = require("../../../../libs/common/abstract.entity");
const typeorm_1 = require("typeorm");
const use_dto_decorator_1 = require("../../../../libs/decorators/use-dto.decorator");
const user_entity_1 = require("../user/user.entity");
let TemplateHdEntity = class TemplateHdEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, noidung: { required: false, type: () => String }, loaitemplate: { required: false, type: () => String }, createdAt: { required: false, type: () => Date }, updatedAt: { required: false, type: () => Date }, createdBy: { required: false, type: () => Number }, updatedBy: { required: false, type: () => Number }, nguoitao: { required: true, type: () => require("../user/user.entity").UserEntity }, nguoisua: { required: true, type: () => require("../user/user.entity").UserEntity } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], TemplateHdEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        name: 'noi_dung',
        type: 'text',
    }),
    __metadata("design:type", String)
], TemplateHdEntity.prototype, "noidung", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'ten_mau_hop_dong' }),
    __metadata("design:type", String)
], TemplateHdEntity.prototype, "loaitemplate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        nullable: true,
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], TemplateHdEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        nullable: true,
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], TemplateHdEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'created_by' }),
    __metadata("design:type", Number)
], TemplateHdEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'updated_by' }),
    __metadata("design:type", Number)
], TemplateHdEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (nhanvien) => nhanvien.temps),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.UserEntity)
], TemplateHdEntity.prototype, "nguoitao", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (nhanvien) => nhanvien.temp),
    (0, typeorm_1.JoinColumn)({ name: 'updated_by' }),
    __metadata("design:type", user_entity_1.UserEntity)
], TemplateHdEntity.prototype, "nguoisua", void 0);
TemplateHdEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'mauhopdong' })
], TemplateHdEntity);
exports.TemplateHdEntity = TemplateHdEntity;
//# sourceMappingURL=templatehd.entity.js.map