"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePasswordResetDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const send_coding_email_dto_1 = require("./send-coding-email.dto");
class UpdatePasswordResetDto extends (0, swagger_1.PartialType)(send_coding_email_dto_1.SendCodingEmail) {
}
exports.UpdatePasswordResetDto = UpdatePasswordResetDto;
//# sourceMappingURL=update-password-reset.dto.js.map