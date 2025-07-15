import { HttpStatus } from '@nestjs/common';
import { BlockedHoursService } from '../service/blocked-hours.service';
import { CreateBlockedHoursDto } from '../DTO/create.blockedHours.dto';
import { BlockedHoursFilterDto } from '../DTO/filter.blockedHours.dto';
import { BlockedHoursResponseDto } from '../DTO/response.blockedHours.dto';
export declare class BlockedHoursController {
    private readonly blockedHoursService;
    constructor(blockedHoursService: BlockedHoursService);
    createBlockedHours(createBlockedHours: CreateBlockedHoursDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            id: number;
            createdAt: Date;
            date: Date;
            reason: string;
        };
    }>;
    getBlockedHours(filters: BlockedHoursFilterDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: BlockedHoursResponseDto[];
    }>;
    deleteBlockedHours(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            id: number;
            createdAt: Date;
            date: Date;
            reason: string;
        };
    }>;
}
