import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateJobDto } from "./dto/create-job.dto";
import { JobService } from "./job.service";
import { Job } from "./job.entity";

@ApiTags("jobs") // Adds this controller under "jobs" section in Swagger UI
@Controller("jobs")
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @ApiOperation({ summary: "Create a new job" })
  @ApiResponse({
    status: 201,
    description: "Job successfully created",
    type: Job,
  })
  async createJob(@Body() createJobDto: CreateJobDto): Promise<Job> {
    return this.jobService.createJob(createJobDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all jobs" })
  async getAllJobs(): Promise<Job[]> {
    return this.jobService.getAllJobs();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a job by ID" })
  @ApiResponse({ status: 404, description: "Job not found" })
  async getJobById(@Param("id") id: number): Promise<Job> {
    return this.jobService.getJobById(id);
  }
}
