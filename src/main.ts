import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

    const config = new DocumentBuilder()
    .setTitle('BroCortes')
    .setDescription('Documentação da api de agendamentos Brocortes')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log(`Rodando na porta ${process.env.PORT}`);
  console.log(`Link para a documentação: http://localhost:${process.env.PORT}/api`)
}
bootstrap();
