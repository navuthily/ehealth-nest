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
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_type_1 = require("../../../../libs/common/constants/role-type");
const page_dto_1 = require("../../../../libs/common/dto/page.dto");
const auth_user_decorator_1 = require("../../../../libs/decorators/auth-user.decorator");
const http_decorators_1 = require("../../../../libs/decorators/http.decorators");
const translation_service_1 = require("../../../../libs/shared/services/translation.service");
const user_dto_1 = require("./dto/user-dto");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
const crud_1 = require("@nestjsx/crud");
const roles_decorator_1 = require("../../../../libs/decorators/roles.decorator");
const updated_interceptor_1 = require("../interceptor/updated-interceptor");
const created_interceptor_1 = require("../interceptor/created-interceptor");
const auth_guard_1 = require("../../../../libs/guards/auth.guard");
const roles_guard_1 = require("../../../../libs/guards/roles.guard");
let UserController = class UserController {
    constructor(userService, translationService, service) {
        this.userService = userService;
        this.translationService = translationService;
        this.service = service;
    }
    get base() {
        return this;
    }
    async createOne(userDto) {
        const createdUser = await this.userService.createUser(userDto);
        return createdUser.toDto({
            isActive: true,
        });
    }
};
__decorate([
    (0, crud_1.Override)(),
    openapi.ApiResponse({ status: 200, type: require("./dto/user-dto").UserDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createOne", null);
UserController = __decorate([
    (0, crud_1.Crud)({
        model: {
            type: user_entity_1.UserEntity,
        },
        query: {
            join: {
                chucvu: {
                    eager: false,
                },
                chucdanh: {
                    eager: false,
                },
                dmhopdong: {
                    eager: false,
                },
                dmtrinhdo: {
                    eager: false,
                },
                dmloaitinhluong: {
                    eager: false,
                },
                dmnganhang: {
                    eager: false,
                },
                dmbophan: {
                    eager: false,
                },
                dmloaikhoi: {
                    eager: false,
                },
                nhanvienhopdongs: {
                    eager: false,
                },
                'nhanvienhopdongs.loaihopdong': {
                    eager: false,
                },
                'dmbophan.phongban': {
                    eager: false,
                },
                chuyenkhoa: {
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
                interceptors: [new updated_interceptor_1.UpdateInterceptor()],
            },
            createOneBase: {
                decorators: [(0, roles_decorator_1.Roles)(role_type_1.RoleType.ADMIN)],
                interceptors: [new created_interceptor_1.CreateInterceptor()],
            },
        },
    }),
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.UseGuards)((0, auth_guard_1.AuthGuard)(), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [user_service_1.UserService,
        translation_service_1.TranslationService,
        user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map