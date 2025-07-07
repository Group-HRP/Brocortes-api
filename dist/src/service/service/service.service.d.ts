import { PrismaClient } from '@prisma/client';
import { CreateServiceDto } from '../DTO/create.service.dto';
import { UpdateServiceDto } from '../DTO/update.service.dto';
import { DeleteServiceOptionsDto } from '../DTO/delete.service.dto';
export declare class ServiceService {
    private prisma;
    constructor(prisma: PrismaClient);
    create(createServiceDto: CreateServiceDto): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        duration: number;
        price: number;
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
    findAll(): Promise<{
        name: string;
        id: number;
        description: string | null;
        duration: number;
        price: number;
    }[]>;
    findOneServiceNotCategory(categoryId: number): Promise<{
        name: string;
        id: number;
    }[]>;
    update(id: number, updateServiceDto: UpdateServiceDto): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        duration: number;
        price: number;
    }>;
    remove(id: number, deleteServiceOptionsDto: DeleteServiceOptionsDto): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        duration: number;
        price: number;
    }>;
}
