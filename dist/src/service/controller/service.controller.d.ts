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
            description: string | null;
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            duration: number;
            price: number;
        };
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: ServiceResponseDto[];
    }>;
    findOne(serviceId: number): Promise<{
        name: string;
        id: number;
        duration: number;
        price: number;
        categories: {
            name: string;
            id: number;
        }[];
    }>;
    findOneServiceNotCategory(categoryId: number): Promise<{
        name: string;
        id: number;
        duration: number;
        price: number;
    }[]>;
    update(id: number, updateServiceDto: UpdateServiceDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            description: string | null;
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            duration: number;
            price: number;
        };
    }>;
    remove(id: number, deleteServiceOptionsDto: DeleteServiceOptionsDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
