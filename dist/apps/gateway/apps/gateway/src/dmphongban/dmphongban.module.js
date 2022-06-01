"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DmphongbanModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dmphongban_controller_1 = require("./dmphongban.controller");
const dmphongban_repository_1 = require("./dmphongban.repository");
const dmphongban_service_1 = require("./dmphongban.service");
const translation_service_1 = require("../../../../libs/shared/services/translation.service");
let DmphongbanModule = class DmphongbanModule {
};
DmphongbanModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([dmphongban_repository_1.DmphongbanRepository]),
        ],
        controllers: [dmphongban_controller_1.DmphongbanController],
        exports: [dmphongban_service_1.DmphongbanService, translation_service_1.TranslationService],
        providers: [dmphongban_service_1.DmphongbanService, translation_service_1.TranslationService,],
    })
], DmphongbanModule);
exports.DmphongbanModule = DmphongbanModule;
//# sourceMappingURL=dmphongban.module.js.map