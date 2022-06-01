"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageThongtinbenhvienModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const language_thongtinbenhvien_controller_1 = require("./language-thongtinbenhvien.controller");
const language_thongtinbenhvien_service_1 = require("./language-thongtinbenhvien.service");
let LanguageThongtinbenhvienModule = class LanguageThongtinbenhvienModule {
};
LanguageThongtinbenhvienModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
        ],
        controllers: [language_thongtinbenhvien_controller_1.LanguageThongtinbenhvienController],
        providers: [language_thongtinbenhvien_service_1.LanguageThongtinbenhvienService],
    })
], LanguageThongtinbenhvienModule);
exports.LanguageThongtinbenhvienModule = LanguageThongtinbenhvienModule;
//# sourceMappingURL=language-thongtinbenhvien.module.js.map