import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  role_id: number;
  @Column({ unique: true })
  role: string;

  @OneToMany(() => User, (user) => user.user_id)
  users: User[];
}
