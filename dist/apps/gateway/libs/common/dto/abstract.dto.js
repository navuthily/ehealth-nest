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
exports.AbstractDto = void 0;
const openapi = require("@nestjs/swagger");
const query_graphql_1 = require("@nestjs-query/query-graphql");
const graphql_1 = require("@nestjs/graphql");
let AbstractDto = class AbstractDto {
    constructor(entity) {
        this.id = entity === null || entity === void 0 ? void 0 : entity.id;
        this.createdAt = entity === null || entity === void 0 ? void 0 : entity.createdAt;
        this.updatedAt = entity === null || entity === void 0 ? void 0 : entity.updatedAt;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", Number)
], AbstractDto.prototype, "id", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", Date)
], AbstractDto.prototype, "createdAt", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", Date)
], AbstractDto.prototype, "updatedAt", void 0);
AbstractDto = __decorate([
    (0, graphql_1.ObjectType)('AbstractDto'),
    __metadata("design:paramtypes", [Function])
], AbstractDto);
exports.AbstractDto = AbstractDto;
//# sourceMappingURL=abstract.dto.js.map