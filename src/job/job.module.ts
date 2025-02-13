import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CacheModule } from "@nestjs/cache-manager";
import { JobService } from "./job.service";
import { JobController } from "./job.controller";
import { Job } from "./job.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Job]),
    CacheModule.register(), // ✅ Ensure CacheModule is imported here
  ],
  providers: [JobService],
  controllers: [JobController],
})
export class JobModule {}
