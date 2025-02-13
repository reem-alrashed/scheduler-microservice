import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './job.entity';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  // Fetch all jobs
  async getAllJobs(): Promise<Job[]> {
    return this.jobRepository.find();
  }

  // Fetch a job by ID
  async getJobById(id: number): Promise<Job> {
    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  // Create a new job
  async createJob(createJobDto: CreateJobDto): Promise<Job> {
    const { name, schedule, nextRun } = createJobDto;

    const newJob = this.jobRepository.create({
      name,
      schedule,
      nextRun,
      lastRun: undefined, // Fix: Use `undefined` instead of `null`
    });

    return await this.jobRepository.save(newJob);
  }

  // Update a job (for example, changing the schedule)
  async updateJob(id: number, updateData: Partial<CreateJobDto>): Promise<Job> {
    const job = await this.getJobById(id);

    Object.assign(job, updateData);
    return await this.jobRepository.save(job);
  }

  // Delete a job
  async deleteJob(id: number): Promise<void> {
    const result = await this.jobRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
  }

  // Mark job as executed (update lastRun timestamp)
  async markJobExecuted(id: number): Promise<Job> {
    const job = await this.getJobById(id);
    job.lastRun = new Date();
    return await this.jobRepository.save(job);
  }
}
