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
exports.ValidateCoding = void 0;
const class_validator_1 = require("class-validator");
class ValidateCoding {
    token;
}
exports.ValidateCoding = ValidateCoding;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4, 4, { message: 'O código deve ter exatamente 4 caracteres.' }),
    (0, class_validator_1.Matches)(/^\d{4}$/, { message: 'O código deve conter apenas números.' }),
    __metadata("design:type", String)
], ValidateCoding.prototype, "token", void 0);
//# sourceMappingURL=validate-coding.dto.js.map