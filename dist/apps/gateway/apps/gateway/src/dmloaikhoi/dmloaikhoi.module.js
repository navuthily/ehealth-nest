"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DmloaikhoiModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dmloaikhoi_controller_1 = require("./dmloaikhoi.controller");
const dmloaikhoi_repository_1 = require("./dmloaikhoi.repository");
const dmloaikhoi_service_1 = require("./dmloaikhoi.service");
const translation_service_1 = require("../../../../libs/shared/services/translation.service");
let DmloaikhoiModule = class DmloaikhoiModule {
};
DmloaikhoiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([dmloaikhoi_repository_1.DmloaikhoiRepository]),
        ],
        controllers: [dmloaikhoi_controller_1.DmloaikhoiController],
        exports: [dmloaikhoi_service_1.DmloaikhoiService, translation_service_1.TranslationService],
        providers: [dmloaikhoi_service_1.DmloaikhoiService, translation_service_1.TranslationService,],
    })
], DmloaikhoiModule);
exports.DmloaikhoiModule = DmloaikhoiModule;
//# sourceMappingURL=dmloaikhoi.module.js.map