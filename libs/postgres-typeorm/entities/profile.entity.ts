import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  profile_id: number;
  @Column()
  first_name: string;
  @Column()
  second_name: string;
  @Column()
  surname: string;
  @Column()
  phone_number: string;
  @Column()
  bio: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
