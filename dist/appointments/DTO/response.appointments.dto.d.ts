export declare class AppointmentResponseDto {
    id: number;
    userId: number;
    serviceId: number;
    date: Date;
    status: string;
    user?: {
        id: number;
        name: string;
    };
    service?: {
        id: number;
        name: string;
    };
    constructor(partial: Partial<AppointmentResponseDto>);
}
