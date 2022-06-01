"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateHdModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const templatehd_controller_1 = require("./templatehd.controller");
const templatehd_repository_1 = require("./templatehd.repository");
const templatehd_service_1 = require("./templatehd.service");
const translation_service_1 = require("../../../../libs/shared/services/translation.service");
let TemplateHdModule = class TemplateHdModule {
};
TemplateHdModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([templatehd_repository_1.TemplateHdRepository]),
        ],
        controllers: [templatehd_controller_1.TemplateHdController],
        exports: [templatehd_service_1.TemplateHdService, translation_service_1.TranslationService],
        providers: [templatehd_service_1.TemplateHdService, translation_service_1.TranslationService,],
    })
], TemplateHdModule);
exports.TemplateHdModule = TemplateHdModule;
//# sourceMappingURL=templatehd.module.js.map