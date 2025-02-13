import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class CreateJobDto {
  @ApiProperty({
    example: "Report Generation",
    description: "The name of the job",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "*/5 * * * *", description: "Cron schedule pattern" })
  @IsString()
  @IsNotEmpty()
  schedule: string;

  @ApiProperty({
    example: "2025-02-13T10:00:00.000Z",
    description: "Next scheduled run time",
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  nextRun: Date;
}
