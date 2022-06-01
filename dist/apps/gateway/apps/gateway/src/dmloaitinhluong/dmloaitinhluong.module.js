"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DmloaitinhluongModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dmloaitinhluong_controller_1 = require("./dmloaitinhluong.controller");
const dmloaitinhluong_repository_1 = require("./dmloaitinhluong.repository");
const dmloaitinhluong_service_1 = require("./dmloaitinhluong.service");
const translation_service_1 = require("../../../../libs/shared/services/translation.service");
let DmloaitinhluongModule = class DmloaitinhluongModule {
};
DmloaitinhluongModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([dmloaitinhluong_repository_1.DmloaitinhluongRepository]),
        ],
        controllers: [dmloaitinhluong_controller_1.DmloaitinhluongController],
        exports: [dmloaitinhluong_service_1.DmloaitinhluongService, translation_service_1.TranslationService],
        providers: [dmloaitinhluong_service_1.DmloaitinhluongService, translation_service_1.TranslationService,],
    })
], DmloaitinhluongModule);
exports.DmloaitinhluongModule = DmloaitinhluongModule;
//# sourceMappingURL=dmloaitinhluong.module.js.map