import { Test, TestingModule } from '@nestjs/testing';
import { RabbitmqConfigService } from './rabbitmq-config.service';

describe('RabbitmqConfigService', () => {
  let service: RabbitmqConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RabbitmqConfigService],
    }).compile();

    service = module.get<RabbitmqConfigService>(RabbitmqConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
