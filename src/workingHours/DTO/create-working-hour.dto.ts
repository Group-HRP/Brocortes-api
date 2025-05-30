import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateWorkingHourDto {
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
