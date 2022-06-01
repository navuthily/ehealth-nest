"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DmloaitinhluongRepository = void 0;
const typeorm_1 = require("typeorm");
const EntityRepository_1 = require("typeorm/decorator/EntityRepository");
const dmloaitinhluong_entity_1 = require("./dmloaitinhluong.entity");
let DmloaitinhluongRepository = class DmloaitinhluongRepository extends typeorm_1.Repository {
};
DmloaitinhluongRepository = __decorate([
    (0, EntityRepository_1.EntityRepository)(dmloaitinhluong_entity_1.DmloaitinhluongEntity)
], DmloaitinhluongRepository);
exports.DmloaitinhluongRepository = DmloaitinhluongRepository;
//# sourceMappingURL=dmloaitinhluong.repository.js.map