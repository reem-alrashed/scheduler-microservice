import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as redisStore from "cache-manager-redis-store";
import { JobModule } from "./job/job.module";

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: "localhost", // Update if using a different host (e.g., Docker)
      port: 6379, // Default Redis port
      ttl: 60, // Cache expiration in seconds
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "",
      password: "",
      database: "scheduler",
      autoLoadEntities: true,
      synchronize: true,
    }),
    JobModule,
  ],
})
export class AppModule {}
