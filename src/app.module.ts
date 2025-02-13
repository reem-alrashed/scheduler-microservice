import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobModule } from './job/job.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: '',
      password: '',
      database: 'scheduler',
      autoLoadEntities: true,
      synchronize: true,
    }),
    JobModule,
  ],
})
export class AppModule {}
