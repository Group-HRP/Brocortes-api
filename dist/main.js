"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:8081', 'exp://192.168.15.9:8081', 'exp://192.168.0.110:8081'],
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
    console.log(`Rodando na porta ${process.env.PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map