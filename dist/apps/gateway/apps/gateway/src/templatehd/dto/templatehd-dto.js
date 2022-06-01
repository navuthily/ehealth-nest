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
exports.TemplatehdDTO = void 0;
const query_graphql_1 = require("@nestjs-query/query-graphql");
const graphql_1 = require("@nestjs/graphql");
const abstract_dto_1 = require("../../../../../libs/common/dto/abstract.dto");
let TemplatehdDTO = class TemplatehdDTO extends abstract_dto_1.AbstractDto {
};
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", Number)
], TemplatehdDTO.prototype, "createdBy", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", Number)
], TemplatehdDTO.prototype, "updatedBy", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", String)
], TemplatehdDTO.prototype, "noidung", void 0);
__decorate([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    __metadata("design:type", String)
], TemplatehdDTO.prototype, "loaitemplate", void 0);
TemplatehdDTO = __decorate([
    (0, graphql_1.ObjectType)('Templatehd'),
    (0, query_graphql_1.QueryOptions)({
        pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
        maxResultsSize: 1000000,
        defaultResultSize: 1000000,
        enableTotalCount: false,
    })
], TemplatehdDTO);
exports.TemplatehdDTO = TemplatehdDTO;
//# sourceMappingURL=templatehd-dto.js.map