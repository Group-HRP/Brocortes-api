"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express = require("express");
const server = express();
const adapter = new platform_express_1.ExpressAdapter(server);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, adapter);
    app.enableCors({
        origin: ['http://localhost:8081', 'exp://192.168.15.9:8081'],
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    await app.init();
}
bootstrap();
exports.default = server;
//# sourceMappingURL=main.js.map