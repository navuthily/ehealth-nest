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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NhanvienhopdongController = void 0;
const openapi = require("@nestjs/swagger");
const auth_guard_1 = require("../../../../libs/guards/auth.guard");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("@nestjsx/crud");
const nhanvienhopdong_service_1 = require("./nhanvienhopdong.service");
const nhanvienhopdong_entity_1 = require("./nhanvienhopdong.entity");
const role_type_1 = require("../../../../libs/common/constants/role-type");
const roles_decorator_1 = require("../../../../libs/decorators/roles.decorator");
const roles_guard_1 = require("../../../../libs/guards/roles.guard");
const created_interceptor_1 = require("../interceptor/created-interceptor");
const updated_interceptor_1 = require("../interceptor/updated-interceptor");
let NhanvienhopdongController = class NhanvienhopdongController {
    constructor(service) {
        this.service = service;
    }
    get base() {
        return this;
    }
};
NhanvienhopdongController = __decorate([
    (0, crud_1.Crud)({
        model: {
            type: nhanvienhopdong_entity_1.NhanvienhopdongEntity,
        },
        query: {
            join: {
                loaihopdong: { eager: false },
                nhanvien: { eager: false },
            },
        },
        routes: {
            getOneBase: {
                decorators: [(0, roles_decorator_1.Roles)(role_type_1.RoleType.ADMIN)],
            },
            deleteOneBase: {
                decorators: [(0, roles_decorator_1.Roles)(role_type_1.RoleType.ADMIN)],
            },
            getManyBase: {
                decorators: [(0, roles_decorator_1.Roles)(role_type_1.RoleType.ADMIN)],
            },
            updateOneBase: {
                decorators: [(0, roles_decorator_1.Roles)(role_type_1.RoleType.ADMIN)],
                interceptors: [new updated_interceptor_1.UpdateInterceptor()],
            },
            createOneBase: {
                decorators: [(0, roles_decorator_1.Roles)(role_type_1.RoleType.ADMIN)],
                interceptors: [new created_interceptor_1.CreateInterceptor()],
            },
        },
    }),
    (0, common_1.Controller)('nhanvienhopdong'),
    (0, common_1.UseGuards)((0, auth_guard_1.AuthGuard)(), roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('nhanvienhopdong'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __metadata("design:paramtypes", [nhanvienhopdong_service_1.NhanvienhopdongService])
], NhanvienhopdongController);
exports.NhanvienhopdongController = NhanvienhopdongController;
//# sourceMappingURL=nhanvienhopdong.controller.js.map