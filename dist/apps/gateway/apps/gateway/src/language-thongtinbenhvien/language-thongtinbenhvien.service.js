"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageThongtinbenhvienService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let LanguageThongtinbenhvienService = class LanguageThongtinbenhvienService {
    constructor(connection) {
        this.connection = connection;
    }
    async exec_multi_language_infomation_hospital(id, keyname, code) {
        let stored = `SELECT gd2lb.id ,gd2lblg.value as label,gd2lb.keyname as keyname  
    from GD2_ThongTinBenhVien ttbv
    join gd2_dm_label gd2lb  on  ttbv.Id_BenhVien=gd2lb.Id_BenhVien AND gd2lb.keyname in (${keyname})
    join gd2_label_language gd2lblg on gd2lblg.id_label = gd2lb.id 
    join gd2_dm_language L ON gd2lblg.id_language=L.ID AND L.code =@1
    where ttbv.Id_BenhVien = @0 and gd2lb.active = 1 and gd2lblg.active = 1 and L.active = 1`;
        let data = await this.connection.query(`${stored}`, [id, code]);
        return data;
    }
};
LanguageThongtinbenhvienService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], LanguageThongtinbenhvienService);
exports.LanguageThongtinbenhvienService = LanguageThongtinbenhvienService;
//# sourceMappingURL=language-thongtinbenhvien.service.js.map