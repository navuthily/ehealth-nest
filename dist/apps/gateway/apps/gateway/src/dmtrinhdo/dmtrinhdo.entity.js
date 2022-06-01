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
exports.DmtrinhdoEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
let DmtrinhdoEntity = class DmtrinhdoEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, tentrinhdo: { required: false, type: () => String }, createdAt: { required: false, type: () => Date }, updatedAt: { required: false, type: () => Date }, createdBy: { required: false, type: () => Number }, updatedBy: { required: false, type: () => Number }, nguoitao: { required: true, type: () => require("../user/user.entity").UserEntity }, nguoisua: { required: true, type: () => require("../user/user.entity").UserEntity }, nhanviens: { required: true, type: () => [require("../user/user.entity").UserEntity] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], DmtrinhdoEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ten_trinh_do' }),
    __metadata("design:type", String)
], DmtrinhdoEntity.prototype, "tentrinhdo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        nullable: true,
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], DmtrinhdoEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        nullable: true,
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], DmtrinhdoEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'created_by' }),
    __metadata("design:type", Number)
], DmtrinhdoEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'updated_by' }),
    __metadata("design:type", Number)
], DmtrinhdoEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (nhanvien) => nhanvien.nguoitaotrinhdo),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.UserEntity)
], DmtrinhdoEntity.prototype, "nguoitao", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (nhanvien) => nhanvien.nguoisuatrinhdo),
    (0, typeorm_1.JoinColumn)({ name: 'updated_by' }),
    __metadata("design:type", user_entity_1.UserEntity)
], DmtrinhdoEntity.prototype, "nguoisua", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.UserEntity, (nhanvien) => nhanvien.dmtrinhdo),
    __metadata("design:type", Array)
], DmtrinhdoEntity.prototype, "nhanviens", void 0);
DmtrinhdoEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'trinhdo' })
], DmtrinhdoEntity);
exports.DmtrinhdoEntity = DmtrinhdoEntity;
//# sourceMappingURL=dmtrinhdo.entity.js.map