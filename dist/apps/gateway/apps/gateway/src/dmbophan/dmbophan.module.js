"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DmbophanModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dmbophan_controller_1 = require("./dmbophan.controller");
const dmbophan_repository_1 = require("./dmbophan.repository");
const dmbophan_service_1 = require("./dmbophan.service");
const translation_service_1 = require("../../../../libs/shared/services/translation.service");
let DmbophanModule = class DmbophanModule {
};
DmbophanModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([dmbophan_repository_1.DmbophanRepository]),
        ],
        controllers: [dmbophan_controller_1.DmbophanController],
        exports: [dmbophan_service_1.DmbophanService, translation_service_1.TranslationService],
        providers: [dmbophan_service_1.DmbophanService, translation_service_1.TranslationService,],
    })
], DmbophanModule);
exports.DmbophanModule = DmbophanModule;
//# sourceMappingURL=dmbophan.module.js.map