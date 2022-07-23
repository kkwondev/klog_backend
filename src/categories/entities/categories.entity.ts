import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('isDisplay', ['isDisplay'])
@Entity({ schema: 'blog', name: 'categories' })
export class Categorires {
  @PrimaryGeneratedColumn({ type: 'int', name: 'categoryId' })
  categoryId: number;

  @Column({ type: 'varchar', length: 10, name: 'name', unique: true })
  name: string;

  @Column({ type: 'tinyint', default: 1, name: 'isDisplay' })
  isDisplay: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', default: null })
  updatedAt: Date;
}
