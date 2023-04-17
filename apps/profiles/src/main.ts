import { NestFactory } from '@nestjs/core';
import { ProfilesModule } from './profiles.module';
import { ConfigService } from '@nestjs/config';
import { RabbitmqConfigService } from '@app/rabbitmq-config';

async function bootstrap() {
  const configService = new ConfigService();
  const rabbitConfig = new RabbitmqConfigService(configService);
  const app = await NestFactory.createMicroservice(
    ProfilesModule,
    rabbitConfig.getRmqOptions(configService.get('RABBITMQ_PROFILE_QUEUE')),
  );
  app.listen();
}
bootstrap();
