import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from './libs/postgres-typeorm/entities/user.entity';
import { Profile } from './libs/postgres-typeorm/entities/profile.entity';
import { Role } from './libs/postgres-typeorm/entities/role.entity';
import { $npmConfigName1681412069951 } from './migrations/1681412069951-$npm_config_name';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [User, Profile, Role],
  migrations: [$npmConfigName1681412069951],
});
