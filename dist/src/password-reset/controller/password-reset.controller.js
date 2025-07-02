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
exports.PasswordResetController = void 0;
const common_1 = require("@nestjs/common");
const password_reset_service_1 = require("../service/password-reset.service");
const send_coding_email_dto_1 = require("../DTO/send-coding-email.dto");
const validate_coding_dto_1 = require("../DTO/validate-coding.dto");
const reset_password_dto_1 = require("../DTO/reset-password.dto");
let PasswordResetController = class PasswordResetController {
    passwordResetService;
    constructor(passwordResetService) {
        this.passwordResetService = passwordResetService;
    }
    async sendCodingEmail(sendCodingEmail) {
        return this.passwordResetService.sendCodingEmail(sendCodingEmail);
    }
    async validateCoding(validateCondig) {
        return this.passwordResetService.validateCoding(validateCondig);
    }
    resetPassword(resetPasswordDto) {
        return this.passwordResetService.resetPassword(resetPasswordDto);
    }
};
exports.PasswordResetController = PasswordResetController;
__decorate([
    (0, common_1.Post)('send'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_coding_email_dto_1.SendCodingEmail]),
    __metadata("design:returntype", Promise)
], PasswordResetController.prototype, "sendCodingEmail", null);
__decorate([
    (0, common_1.Post)('validate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [validate_coding_dto_1.ValidateCoding]),
    __metadata("design:returntype", Promise)
], PasswordResetController.prototype, "validateCoding", null);
__decorate([
    (0, common_1.Post)('reset'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", void 0)
], PasswordResetController.prototype, "resetPassword", null);
exports.PasswordResetController = PasswordResetController = __decorate([
    (0, common_1.Controller)('password-reset'),
    __metadata("design:paramtypes", [password_reset_service_1.PasswordResetService])
], PasswordResetController);
//# sourceMappingURL=password-reset.controller.js.map