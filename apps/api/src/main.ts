import { writeFileSync } from 'fs';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import { dump } from 'js-yaml';
import { AppModule } from './app.module';
import { Env } from './config/environments/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const env: Env = app.get(Env);

  if (env.SentryDsn && (env.isProduction() || env.SentryEnabled)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    Sentry.init({
      dsn: env.SentryDsn,
    });
  }

  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  }); // CORSを有効化

  // Setting Swagger API
  const config = new DocumentBuilder()
    .setTitle('API Doc')
    .setDescription('API Doc Description')
    .setVersion('1.0')
    .build();

  // Create API Document
  const document = SwaggerModule.createDocument(app, config);

  // API Doc Endpoint
  SwaggerModule.setup('api', app, document);

  const openApiOutputPath = path.resolve(process.cwd(), 'openapi.yml');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  writeFileSync(openApiOutputPath, dump(document, {}));

  await app.listen(env.Port, env.Host);
}
bootstrap();
