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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageThongtinbenhvienController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const language_thongtinbenhvien_service_1 = require("./language-thongtinbenhvien.service");
let LanguageThongtinbenhvienController = class LanguageThongtinbenhvienController {
    constructor(languagethongtinbenhvienService) {
        this.languagethongtinbenhvienService = languagethongtinbenhvienService;
    }
    async index(data) {
        const { id, keyname, code } = data;
        const result = await this.languagethongtinbenhvienService.exec_multi_language_infomation_hospital(id, keyname, code);
        return result;
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LanguageThongtinbenhvienController.prototype, "index", null);
LanguageThongtinbenhvienController = __decorate([
    (0, swagger_1.ApiTags)('language-thongtinbenhvien'),
    (0, common_1.Controller)('language-thongtinbenhvien'),
    __metadata("design:paramtypes", [language_thongtinbenhvien_service_1.LanguageThongtinbenhvienService])
], LanguageThongtinbenhvienController);
exports.LanguageThongtinbenhvienController = LanguageThongtinbenhvienController;
//# sourceMappingURL=language-thongtinbenhvien.controller.js.map