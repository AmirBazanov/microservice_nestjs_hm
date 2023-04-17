import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { RabbitmqConfigService } from '@app/rabbitmq-config';

async function bootstrap() {
  const configService = new ConfigService();
  const rabbitConfig = new RabbitmqConfigService(configService);
  const app = await NestFactory.createMicroservice(
    AuthModule,
    rabbitConfig.getRmqOptions(configService.get('RABBITMQ_AUTH_QUEUE')),
  );
  app.listen();
}
bootstrap();
