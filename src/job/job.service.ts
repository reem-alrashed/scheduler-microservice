import { Injectable, NotFoundException, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Job } from "./job.entity";
import { CreateJobDto } from "./dto/create-job.dto";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  // Fetch all jobs (with caching)
  async getAllJobs(): Promise<Job[]> {
    const cacheKey = "all_jobs";
    const cachedJobs = await this.cacheManager.get<Job[]>(cacheKey);

    if (cachedJobs) {
      return cachedJobs;
    }

    const jobs = await this.jobRepository.find();
    await this.cacheManager.set(cacheKey, jobs, 60); // Fixed TTL issue

    return jobs;
  }

  // Fetch a job by ID (with caching)
  async getJobById(id: number): Promise<Job> {
    const cacheKey = `job_${id}`;
    const cachedJob = await this.cacheManager.get<Job>(cacheKey);

    if (cachedJob) {
      return cachedJob;
    }

    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    await this.cacheManager.set(cacheKey, job, 60); // Fixed TTL issue
    return job;
  }

  // Create a new job (clear cache after creation)
  async createJob(createJobDto: CreateJobDto): Promise<Job> {
    const { name, schedule, nextRun } = createJobDto;

    const newJob = this.jobRepository.create({
      name,
      schedule,
      nextRun,
      lastRun: undefined, // Fix: Use `undefined` instead of `null`
    });

    const savedJob = await this.jobRepository.save(newJob);

    // Clear cache to ensure fresh data
    await this.cacheManager.del("all_jobs");

    return savedJob;
  }

  // Update a job (clear cache after update)
  async updateJob(id: number, updateData: Partial<CreateJobDto>): Promise<Job> {
    const job = await this.getJobById(id);

    Object.assign(job, updateData);
    const updatedJob = await this.jobRepository.save(job);

    // Clear cache to avoid stale data
    await this.cacheManager.del(`job_${id}`);
    await this.cacheManager.del("all_jobs");

    return updatedJob;
  }

  // Delete a job (clear cache after deletion)
  async deleteJob(id: number): Promise<void> {
    const result = await this.jobRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    // Clear cache
    await this.cacheManager.del(`job_${id}`);
    await this.cacheManager.del("all_jobs");
  }

  // Mark job as executed (update lastRun timestamp and clear cache)
  async markJobExecuted(id: number): Promise<Job> {
    const job = await this.getJobById(id);
    job.lastRun = new Date();
    const updatedJob = await this.jobRepository.save(job);

    // Clear cache
    await this.cacheManager.del(`job_${id}`);
    await this.cacheManager.del("all_jobs");

    return updatedJob;
  }
}
