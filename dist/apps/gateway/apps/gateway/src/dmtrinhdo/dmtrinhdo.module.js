"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DmtrinhdoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dmtrinhdo_controller_1 = require("./dmtrinhdo.controller");
const dmtrinhdo_repository_1 = require("./dmtrinhdo.repository");
const dmtrinhdo_service_1 = require("./dmtrinhdo.service");
const translation_service_1 = require("../../../../libs/shared/services/translation.service");
let DmtrinhdoModule = class DmtrinhdoModule {
};
DmtrinhdoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([dmtrinhdo_repository_1.DmtrinhdoRepository]),
        ],
        controllers: [dmtrinhdo_controller_1.DmtrinhdoController],
        exports: [dmtrinhdo_service_1.DmtrinhdoService, translation_service_1.TranslationService],
        providers: [dmtrinhdo_service_1.DmtrinhdoService, translation_service_1.TranslationService,],
    })
], DmtrinhdoModule);
exports.DmtrinhdoModule = DmtrinhdoModule;
//# sourceMappingURL=dmtrinhdo.module.js.map