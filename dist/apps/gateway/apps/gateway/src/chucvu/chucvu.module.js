"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChucvuModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chucvu_controller_1 = require("./chucvu.controller");
const chucvu_repository_1 = require("./chucvu.repository");
const chucvu_service_1 = require("./chucvu.service");
const translation_service_1 = require("../../../../libs/shared/services/translation.service");
let ChucvuModule = class ChucvuModule {
};
ChucvuModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([chucvu_repository_1.ChucvuRepository]),
        ],
        controllers: [chucvu_controller_1.ChucvuController],
        exports: [chucvu_service_1.ChucvuService, translation_service_1.TranslationService],
        providers: [chucvu_service_1.ChucvuService, translation_service_1.TranslationService,],
    })
], ChucvuModule);
exports.ChucvuModule = ChucvuModule;
//# sourceMappingURL=chucvu.module.js.map