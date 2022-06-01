"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChuyenkhoaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chuyenkhoa_controller_1 = require("./chuyenkhoa.controller");
const chuyenkhoa_repository_1 = require("./chuyenkhoa.repository");
const chuyenkhoa_service_1 = require("./chuyenkhoa.service");
const translation_service_1 = require("../../../../libs/shared/services/translation.service");
let ChuyenkhoaModule = class ChuyenkhoaModule {
};
ChuyenkhoaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([chuyenkhoa_repository_1.ChuyenkhoaRepository]),
        ],
        controllers: [chuyenkhoa_controller_1.ChuyenkhoaController],
        exports: [chuyenkhoa_service_1.ChuyenkhoaService, translation_service_1.TranslationService],
        providers: [chuyenkhoa_service_1.ChuyenkhoaService, translation_service_1.TranslationService,],
    })
], ChuyenkhoaModule);
exports.ChuyenkhoaModule = ChuyenkhoaModule;
//# sourceMappingURL=chuyenkhoa.module.js.map