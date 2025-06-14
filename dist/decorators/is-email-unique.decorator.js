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
exports.IsEmailUniqueConstraint = void 0;
exports.IsEmailUnique = IsEmailUnique;
const class_validator_1 = require("class-validator");
const user_service_1 = require("../user/service/user.service");
const common_1 = require("@nestjs/common");
let IsEmailUniqueConstraint = class IsEmailUniqueConstraint {
    constructor(userService) {
        this.userService = userService;
    }
    async validate(email) {
        const user = await this.userService.findByEmail(email);
        return !user;
    }
    defaultMessage() {
        return 'Email já está em uso';
    }
};
exports.IsEmailUniqueConstraint = IsEmailUniqueConstraint;
exports.IsEmailUniqueConstraint = IsEmailUniqueConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsEmailUnique', async: true }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], IsEmailUniqueConstraint);
function IsEmailUnique(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailUniqueConstraint,
        });
    };
}
//# sourceMappingURL=is-email-unique.decorator.js.map