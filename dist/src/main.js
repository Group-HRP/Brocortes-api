"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:8081',
            'exp://192.168.15.9:8081',
            'exp://192.168.0.110:8081',
            'exp://192.168.15.5:8081',
        ],
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('BroCortes')
        .setDescription('Documentação da api de agendamentos Brocortes')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
    console.log(`Rodando na porta ${process.env.PORT}`);
    console.log(`Link para a documentação: http://localhost:${process.env.PORT}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map