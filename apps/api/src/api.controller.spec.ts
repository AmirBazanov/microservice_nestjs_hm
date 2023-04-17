import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './controllers/auth.controller';
import { ApiService } from './api.service';

describe('ApiController', () => {
  let apiController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [ApiService],
    }).compile();

    apiController = app.get<AuthController>(AuthController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(apiController.getHello()).toBe('Hello World!');
    });
  });
});
