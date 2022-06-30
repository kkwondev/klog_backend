import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('loginId', ['loginId'], { unique: true })
@Entity({ schema: 'blog', name: 'users' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'userId' })
  userId: number;

  @Column('varchar', { name: 'loginId', length: 50 })
  loginId: string;

  @Column('varchar', { name: 'nickname', length: 50 })
  nickname: string;

  @Column('varchar', { name: 'password', length: 100, select: false })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', default: null })
  updatedAt: Date;
}
