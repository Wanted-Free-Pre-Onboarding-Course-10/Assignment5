import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', nullable: true })
  updateAt: Date;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'number', unique: true, nullable: false })
  number: string;

  @Column({ name: 'period', nullable: true })
  period: string;

  @Column({ name: 'range', nullable: true })
  range: string;

  @Column({ name: 'type', nullable: true })
  type: string;

  @Column({ name: 'agency', nullable: true })
  agency: string;

  @Column({ name: 'step', nullable: true })
  step: string;

  @Column({ name: 'target_count', nullable: true })
  targetCount: number;

  @Column({ name: 'department', nullable: true })
  department: string;
}
