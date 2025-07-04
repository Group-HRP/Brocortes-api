import { CreateWorkingHourDto } from './create-working-hour.dto';
declare const UpdateWorkingHourDto_base: import("@nestjs/common").Type<Partial<CreateWorkingHourDto>>;
export declare class UpdateWorkingHourDto extends UpdateWorkingHourDto_base {
    dayOfWeek: string;
    openingTime: string;
    closingTime: string;
    isClosed?: boolean;
}
export {};
