import { HttpStatus } from '@nestjs/common';
import { ServiceService } from '../service/service.service';
import { CreateServiceDto } from '../DTO/create.service.dto';
import { ServiceResponseDto } from '../DTO/response.service.dto';
import { UpdateServiceDto } from '../DTO/update.service.dto';
import { DeleteServiceOptionsDto } from '../DTO/delete.service.dto';
export declare class ServiceController {
    private readonly serviceService;
    constructor(serviceService: ServiceService);
    create(createServiceDto: CreateServiceDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            duration: number;
            price: number;
        };
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: ServiceResponseDto[];
    }>;
    findOneServiceNotCategory(categoryId: number): Promise<{
        id: number;
        name: string;
    }[]>;
    update(id: number, updateServiceDto: UpdateServiceDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            duration: number;
            price: number;
        };
    }>;
    remove(id: number, deleteServiceOptionsDto: DeleteServiceOptionsDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
