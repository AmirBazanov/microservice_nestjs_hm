import { Test, TestingModule } from '@nestjs/testing';
import { PostgresTypeormService } from './postgres-typeorm.service';

describe('PostgresTypeormService', () => {
  let service: PostgresTypeormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostgresTypeormService],
    }).compile();

    service = module.get<PostgresTypeormService>(PostgresTypeormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
