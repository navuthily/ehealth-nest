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
exports.ChucdanhController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const chucdanh_service_1 = require("./chucdanh.service");
const crud_1 = require("@nestjsx/crud");
const chucdanh_entity_1 = require("./chucdanh.entity");
const roles_guard_1 = require("../../../../libs/guards/roles.guard");
const roles_decorator_1 = require("../../../../libs/decorators/roles.decorator");
const role_type_1 = require("../../../../libs/common/constants/role-type");
const updated_interceptor_1 = require("../interceptor/updated-interceptor");
const created_interceptor_1 = require("../interceptor/created-interceptor");
const auth_guard_1 = require("../../../../libs/guards/auth.guard");
let ChucdanhController = class ChucdanhController {
    constructor(service) {
        this.service = service;
    }
};
ChucdanhController = __decorate([
    (0, crud_1.Crud)({
        model: {
            type: chucdanh_entity_1.ChucdanhEntity,
        },
        query: {
            join: {
                nhanviens: {
                    eager: true
                }
            }
        },
        routes: {
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
    (0, common_1.Controller)('chucdanh'),
    (0, common_1.UseGuards)((0, auth_guard_1.AuthGuard)(), roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('chucdanh'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __metadata("design:paramtypes", [chucdanh_service_1.ChucdanhService])
], ChucdanhController);
exports.ChucdanhController = ChucdanhController;
//# sourceMappingURL=chucdanh.controller.js.map