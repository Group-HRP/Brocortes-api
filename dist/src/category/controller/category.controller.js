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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("../service/category.service");
const create_category_dto_1 = require("../DTO/create-category.dto");
const update_category_dto_1 = require("../DTO/update-category.dto");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../../user/guards/roles.guard");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
let CategoryController = class CategoryController {
    categoryService;
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async create(createCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }
    async findAll() {
        return this.categoryService.findAll();
    }
    async findOne(id) {
        return this.categoryService.findOne(+id);
    }
    async update(id, updateCategoryDto) {
        return this.categoryService.update(+id, updateCategoryDto);
    }
    async remove(id) {
        return this.categoryService.remove(+id);
    }
    async removeService(id, serviceId) {
        return this.categoryService.removeService(id, serviceId);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Cria uma categoria" }),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Lista todas as categorias" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista todas categorias',
        schema: {
            example: [
                {
                    id: 4,
                    name: "Destaques"
                },
                {
                    id: 1,
                    name: "Corte Masculino"
                },
                {
                    id: 2,
                    name: "Barba"
                },
                {
                    id: 3,
                    name: "Sobrancelha"
                }
            ]
        }
    }),
    (0, roles_decorator_1.Roles)('admin', 'client'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: "Lista categorias por Id" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Lista categorias por Id",
        schema: {
            example: {
                id: 4,
                name: "Destaques",
                service: [
                    {
                        id: 1,
                        name: "Corte de cabelo",
                        description: "Corte de cabelo navalhado",
                        duration: 40,
                        price: 30,
                        createdAt: "2025-05-16T21:53:28.857Z",
                        updatedAt: "2025-05-16T21:53:28.857Z"
                    }
                ]
            }
        }
    }),
    (0, roles_decorator_1.Roles)('admin', 'client'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: "Atualiza categoria" }),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: "Deleta categoria" }),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)('service/:id'),
    (0, swagger_1.ApiOperation)({ summary: "Deleta servico de dentro da categoria" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Detalhes da categoria com serviços aninhados',
        schema: {
            example: {
                id: 3,
                name: "Destaques",
                createdAt: "2025-05-25T21:14:29.907Z",
                atualizedAt: "2025-05-25T21:14:29.907Z",
                service: [
                    {
                        id: 1,
                        name: "Corte de cabelo",
                        description: "Corte de cabelo navalhado",
                        duration: 40,
                        price: 30,
                        createdAt: "2025-05-16T21:53:28.857Z",
                        updatedAt: "2025-05-16T21:53:28.857Z"
                    }
                ]
            }
        }
    }),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "removeService", null);
exports.CategoryController = CategoryController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('category'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map