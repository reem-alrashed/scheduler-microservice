/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { JobService } from './job.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './job.entity';
import { NotFoundException } from '@nestjs/common';

describe('JobService', () => {
  let jobService: JobService;
  let jobRepository: Repository<Job>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobService,
        {
          provide: getRepositoryToken(Job),
          useClass: Repository, // Mock repository
        },
      ],
    }).compile();

    jobService = module.get<JobService>(JobService);
    jobRepository = module.get<Repository<Job>>(getRepositoryToken(Job));
  });

  describe('getAllJobs', () => {
    it('should return an array of jobs', async () => {
      const jobs: Job[] = [
        {
          id: 1,
          name: 'Email Notification',
          lastRun: new Date(),
          nextRun: new Date(),
          schedule: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(jobRepository, 'find').mockResolvedValue(jobs);

      const result = await jobService.getAllJobs();
      expect(result).toEqual(jobs);
      expect(jobRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getJobById', () => {
    it('should return a job when found', async () => {
      const job: Job = {
        id: 1,
        name: 'Data Processing',
        lastRun: new Date(),
        nextRun: new Date(),
        schedule: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(jobRepository, 'findOne').mockResolvedValue(job);

      const result = await jobService.getJobById(1);
      expect(result).toEqual(job);
      expect(jobRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException when job is not found', async () => {
      jest.spyOn(jobRepository, 'findOne').mockResolvedValue(null);

      await expect(jobService.getJobById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createJob', () => {
    it('should create and return a job', async () => {
      const now = new Date();
      const jobDto = {
        name: 'Report Generation',
        schedule: '',
        lastRun: undefined, // ✅ Explicitly set lastRun as undefined
        nextRun: now, // ✅ Provide a valid nextRun value
      };

      const job: Job = {
        id: 1,
        name: jobDto.name,
        lastRun: jobDto.lastRun,
        nextRun: jobDto.nextRun,
        schedule: jobDto.schedule,
        createdAt: now,
        updatedAt: now,
      };

      jest.spyOn(jobRepository, 'create').mockReturnValue(job);
      jest.spyOn(jobRepository, 'save').mockResolvedValue(job);

      const result = await jobService.createJob(jobDto);
      expect(result).toEqual(job);
      expect(jobRepository.create).toHaveBeenCalledWith(jobDto); // ✅ Matches updated jobDto
      expect(jobRepository.save).toHaveBeenCalledWith(job);
    });
  });
});
