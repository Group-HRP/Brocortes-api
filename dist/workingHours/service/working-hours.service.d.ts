import { CreateWorkingHourDto } from '../DTO/create-working-hour.dto';
import { UpdateWorkingHourDto } from '../DTO/update-working-hour.dto';
import { PrismaClient } from '@prisma/client';
export declare class WorkingHoursService {
    private prisma;
    constructor(prisma: PrismaClient);
    create(createWorkingHourDto: CreateWorkingHourDto): Promise<{
        id: number;
        dayOfWeek: string;
        openingTime: string;
        closingTime: string;
        isClosed: boolean;
    }>;
    findAll(): Promise<{
        id: number;
        dayOfWeek: string;
        openingTime: string;
        closingTime: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        dayOfWeek: string;
        openingTime: string;
        closingTime: string;
    } | null>;
    update(id: number, updateWorkingHourDto: UpdateWorkingHourDto): Promise<{
        id: number;
        dayOfWeek: string;
        openingTime: string;
        closingTime: string;
        isClosed: boolean;
    }>;
    remove(id: number): Promise<{
        id: number;
        dayOfWeek: string;
        openingTime: string;
        closingTime: string;
        isClosed: boolean;
    }>;
}
