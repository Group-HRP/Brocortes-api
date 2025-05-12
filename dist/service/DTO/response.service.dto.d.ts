export declare class ServiceResponseDto {
    id: number;
    name: string;
    description: string | null;
    price: number;
    duration: number;
    createdAt: Date;
    updatedAt: Date;
    company?: {
        id: number;
        name: string;
    };
    constructor(partial: Partial<ServiceResponseDto>);
}
