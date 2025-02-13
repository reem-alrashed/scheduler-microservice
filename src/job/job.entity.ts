import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  schedule: string; // Example: "*/5 * * * *" (every 5 minutes)

  @Column({ nullable: true })
  lastRun?: Date;

  @Column()
  nextRun: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
