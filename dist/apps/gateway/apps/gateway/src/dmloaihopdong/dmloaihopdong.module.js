"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DmloaihopdongModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dmloaihopdong_controller_1 = require("./dmloaihopdong.controller");
const dmloaihopdong_repository_1 = require("./dmloaihopdong.repository");
const dmloaihopdong_service_1 = require("./dmloaihopdong.service");
const translation_service_1 = require("../../../../libs/shared/services/translation.service");
let DmloaihopdongModule = class DmloaihopdongModule {
};
DmloaihopdongModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([dmloaihopdong_repository_1.DmloaihopdongRepository]),
        ],
        controllers: [dmloaihopdong_controller_1.DmloaihopdongController],
        exports: [dmloaihopdong_service_1.DmloaihopdongService, translation_service_1.TranslationService],
        providers: [dmloaihopdong_service_1.DmloaihopdongService, translation_service_1.TranslationService,],
    })
], DmloaihopdongModule);
exports.DmloaihopdongModule = DmloaihopdongModule;
//# sourceMappingURL=dmloaihopdong.module.js.map