import { WorkingHoursService } from '../service/working-hours.service';
import { CreateWorkingHourDto } from '../DTO/create-working-hour.dto';
import { UpdateWorkingHourDto } from '../DTO/update-working-hour.dto';
export declare class WorkingHoursController {
    private readonly workingHoursService;
    constructor(workingHoursService: WorkingHoursService);
    create(createWorkingHourDto: CreateWorkingHourDto): Promise<{
        id: number;
        dayOfWeek: string;
        openingTime: string;
        closingTime: string;
        isClosed: boolean;
    }>;
    getAvailableTimes(date: string, serviceId: number): Promise<string[]>;
    findAll(): Promise<{
        id: number;
        dayOfWeek: string;
        openingTime: string;
        closingTime: string;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        dayOfWeek: string;
        openingTime: string;
        closingTime: string;
    } | null>;
    update(id: string, updateWorkingHourDto: UpdateWorkingHourDto): Promise<{
        id: number;
        dayOfWeek: string;
        openingTime: string;
        closingTime: string;
        isClosed: boolean;
    }>;
    remove(id: string): Promise<{
        id: number;
        dayOfWeek: string;
        openingTime: string;
        closingTime: string;
        isClosed: boolean;
    }>;
}
