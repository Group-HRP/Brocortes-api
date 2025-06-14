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
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const user_service_1 = require("../service/user.service");
const user_response_dto_1 = require("../DTO/user.response.dto");
const admin_guard_1 = require("../guards/admin.guard");
const user_update_dto_1 = require("../DTO/user.update.dto");
const user_update_response_dto_1 = require("../DTO/user.update.response.dto");
const user_delete_response_dto_1 = require("../DTO/user.delete.response.dto");
const user_delete_dto_1 = require("../DTO/user.delete.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getAllUsers() {
        const users = await this.userService.getAllUsers();
        return users.map((user) => new user_response_dto_1.UserResponseDto(user));
    }
    async updateUser(id, updateUserDto, req) {
        const userId = Number(req.user.id);
        const paramId = Number(id);
        if (req.user.role !== 'admin' && userId !== paramId) {
            throw new common_1.ForbiddenException('Você só pode atualizar seu próprio perfil');
        }
        if (req.user.role !== 'admin' &&
            updateUserDto.role &&
            updateUserDto.role !== req.user.role) {
            throw new common_1.ForbiddenException('Apenas administradores podem alterar roles');
        }
        const updateUser = await this.userService.updateUser(userId, updateUserDto);
        return new user_update_response_dto_1.UpdateUserResponseDto(updateUser);
    }
    async deleteUser(id, deleteUserDto, req) {
        const userId = Number(req.user.id);
        const paramId = Number(id);
        if (req.user.role !== 'admin' && userId !== paramId) {
            throw new common_1.ForbiddenException('Você só pode deletar seu próprio perfil');
        }
        if (req.user.role !== 'admin' && !deleteUserDto.password) {
            throw new common_1.ForbiddenException('Confirme sua senha para deletar a conta');
        }
        const result = await this.userService.deleteUser(paramId, deleteUserDto);
        return new user_delete_response_dto_1.DeleteUserResponseDto({
            success: true,
            message: 'Usuário deletado com sucesso',
            deletedUserId: paramId,
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_update_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_delete_dto_1.DeleteUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map