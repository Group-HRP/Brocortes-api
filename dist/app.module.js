"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const autentication_module_1 = require("./autentication/autentication.module");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma/prisma.module");
const user_module_1 = require("./user/user.module");
const service_module_1 = require("./service/service.module");
const appointments_module_1 = require("./appointments/appointments.module");
const blocked_hours_module_1 = require("./blockedHours/blocked-hours.module");
const notifications_controller_1 = require("./notifications/controller/notifications.controller");
const notifications_service_1 = require("./notifications/service/notifications.service");
const category_module_1 = require("./category/category.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            auth_module_1.AuthModule,
            autentication_module_1.AutenticationModule,
            prisma_module_1.PrismaModule,
            user_module_1.UserModule,
            service_module_1.ServiceModule,
            appointments_module_1.AppointmentsModule,
            blocked_hours_module_1.BlockedHoursModule,
            category_module_1.CategoryModule,
        ],
        controllers: [notifications_controller_1.NotificationsController],
        providers: [notifications_service_1.NotificationsService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map