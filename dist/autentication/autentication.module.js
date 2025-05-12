"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticationModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_controller_1 = require("../auth/controller/auth.controller");
const auth_service_1 = require("../auth/service/auth.service");
const client_1 = require("@prisma/client");
const jwt_strategy_1 = require("./jwt.strategy");
let AutenticationModule = class AutenticationModule {
};
exports.AutenticationModule = AutenticationModule;
exports.AutenticationModule = AutenticationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.JWT_TOKEN,
                signOptions: { expiresIn: '72h' },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, client_1.PrismaClient, jwt_strategy_1.JwtStrategy],
    })
], AutenticationModule);
//# sourceMappingURL=autentication.module.js.map