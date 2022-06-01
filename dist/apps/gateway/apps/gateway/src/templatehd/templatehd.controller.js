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
exports.TemplateHdController = void 0;
const openapi = require("@nestjs/swagger");
const auth_guard_1 = require("../../../../libs/guards/auth.guard");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("@nestjsx/crud");
const templatehd_service_1 = require("./templatehd.service");
const templatehd_entity_1 = require("./templatehd.entity");
const role_type_1 = require("../../../../libs/common/constants/role-type");
const roles_decorator_1 = require("../../../../libs/decorators/roles.decorator");
const roles_guard_1 = require("../../../../libs/guards/roles.guard");
let TemplateHdController = class TemplateHdController {
    constructor(service) {
        this.service = service;
    }
    get base() {
        return this;
    }
};
TemplateHdController = __decorate([
    (0, crud_1.Crud)({
        model: {
            type: templatehd_entity_1.TemplateHdEntity,
        },
        query: {
            alwaysPaginate: true,
            join: {
                nguoitao: {
                    eager: false,
                },
                nguoisua: {
                    eager: false,
                },
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
            },
            createOneBase: {
                decorators: [(0, roles_decorator_1.Roles)(role_type_1.RoleType.ADMIN)],
            }
        },
    }),
    (0, common_1.Controller)('templatehd'),
    (0, common_1.UseGuards)((0, auth_guard_1.AuthGuard)(), roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiTags)('templatehd'),
    __metadata("design:paramtypes", [templatehd_service_1.TemplateHdService])
], TemplateHdController);
exports.TemplateHdController = TemplateHdController;
//# sourceMappingURL=templatehd.controller.js.map