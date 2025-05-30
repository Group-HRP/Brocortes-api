import { PartialType } from '@nestjs/swagger';
import { CreateWorkingHourDto } from './create-working-hour.dto';
import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateWorkingHourDto extends PartialType(CreateWorkingHourDto) {
  @IsIn([
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ])
  dayOfWeek: string;

  @IsNotEmpty()
  @IsString()
  openingTime: string;

  @IsNotEmpty()
  @IsString()
  closingTime: string;

  @IsBoolean()
  @IsOptional()
  isClosed?: boolean;
}
