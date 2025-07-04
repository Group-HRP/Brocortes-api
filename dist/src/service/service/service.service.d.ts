import { PrismaClient } from '@prisma/client';
import { CreateServiceDto } from '../DTO/create.service.dto';
import { UpdateServiceDto } from '../DTO/update.service.dto';
import { DeleteServiceOptionsDto } from '../DTO/delete.service.dto';
export declare class ServiceService {
    private prisma;
    constructor(prisma: PrismaClient);
    create(createServiceDto: CreateServiceDto): Promise<{
        id: number;
        name: string;
        description: string | null;
        duration: number;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        description: string | null;
        duration: number;
        price: number;
    }[]>;
    findOneServiceNotCategory(categoryId: number): Promise<{
        id: number;
        name: string;
        description: string | null;
        duration: number;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    update(id: number, updateServiceDto: UpdateServiceDto): Promise<{
        id: number;
        name: string;
        description: string | null;
        duration: number;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number, deleteServiceOptionsDto: DeleteServiceOptionsDto): Promise<{
        id: number;
        name: string;
        description: string | null;
        duration: number;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
