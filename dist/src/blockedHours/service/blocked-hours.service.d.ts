import { PrismaClient } from '@prisma/client';
import { CreateBlockedHoursDto } from '../DTO/create.blockedHours.dto';
import { BlockedHoursFilterDto } from '../DTO/filter.blockedHours.dto';
export declare class BlockedHoursService {
    private prisma;
    constructor(prisma: PrismaClient);
    createBlockedHours(createBlockedHours: CreateBlockedHoursDto): Promise<{
        date: Date;
        id: number;
        createdAt: Date;
        reason: string;
    }>;
    getBlockedHours(filters: BlockedHoursFilterDto): Promise<{
        date: Date;
        id: number;
        createdAt: Date;
        reason: string;
    }[]>;
    deleteBlockedHours(id: number): Promise<{
        date: Date;
        id: number;
        createdAt: Date;
        reason: string;
    }>;
}
