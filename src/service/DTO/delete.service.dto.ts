import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

export class DeleteServiceOptionsDto {
    @IsBoolean()
    @IsOptional()
    softDelete?: boolean;
  
    @IsString()
    @IsOptional()
    deletionReason?: string;
  
    @IsInt()
    @IsOptional()
    deletedBy?: number;
  }
