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
exports.UserDto = void 0;
const query_graphql_1 = require("@nestjs-query/query-graphql");
const graphql_1 = require("@nestjs/graphql");
const abstract_dto_1 = require("../../../../../libs/common/dto/abstract.dto");
let UserDto = class UserDto extends abstract_dto_1.AbstractDto {
    constructor(user) {
        super(user);
        this.nickname = user === null || user === void 0 ? void 0 : user.nickname;
        this.holotNhanVien = user === null || user === void 0 ? void 0 : user.holotNhanVien;
        this.tennhanvien = user === null || user === void 0 ? void 0 : user.tennhanvien;
    }
};
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", String)
], UserDto.prototype, "tennhanvien", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", String)
], UserDto.prototype, "holotNhanVien", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", String)
], UserDto.prototype, "nickname", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", String)
], UserDto.prototype, "mobile", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", String)
], UserDto.prototype, "hinhNhanVien", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", Boolean)
], UserDto.prototype, "gioitinh", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", String)
], UserDto.prototype, "quoctich", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", String)
], UserDto.prototype, "cmnd", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", Date)
], UserDto.prototype, "ngaycapCMND", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", String)
], UserDto.prototype, "noicapCMND", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", String)
], UserDto.prototype, "hochieu", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", String)
], UserDto.prototype, "diachi", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", Date)
], UserDto.prototype, "ngaysinh", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", Date)
], UserDto.prototype, "ngayvaolam", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", Date)
], UserDto.prototype, "ngaynghiviec", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", String)
], UserDto.prototype, "masothuecanhan", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", String)
], UserDto.prototype, "sobaohiem", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", String)
], UserDto.prototype, "hinhchuky", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", Boolean)
], UserDto.prototype, "allowLogin", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", String)
], UserDto.prototype, "password", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", String)
], UserDto.prototype, "role", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", Number)
], UserDto.prototype, "trinhdoId", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", Number)
], UserDto.prototype, "bophanId", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", Number)
], UserDto.prototype, "chucvuId", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", Number)
], UserDto.prototype, "chucdanhId", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", Number)
], UserDto.prototype, "loaitinhluongId", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", Number)
], UserDto.prototype, "chuyenkhoaId", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", Number)
], UserDto.prototype, "loaikhoiId", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", Number)
], UserDto.prototype, "createdBy", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", Number)
], UserDto.prototype, "updatedBy", void 0);
UserDto = __decorate([
    (0, graphql_1.ObjectType)('User'),
    (0, query_graphql_1.QueryOptions)({
        pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
        maxResultsSize: 1000000,
        defaultResultSize: 1000000,
        enableTotalCount: false,
    }),
    __metadata("design:paramtypes", [Function])
], UserDto);
exports.UserDto = UserDto;
//# sourceMappingURL=user-dto.js.map