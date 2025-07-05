import { CreateCategoryDto } from '../DTO/create-category.dto';
import { UpdateCategoryDto } from '../DTO/update-category.dto';
import { PrismaClient } from '@prisma/client';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaClient);
    serviceExisting(serviceId: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        description: string | null;
        duration: number;
        price: number;
        updatedAt: Date;
    }>;
    create(createCategoryDto: CreateCategoryDto): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        atualizedAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        service: {
            id: number;
            name: string;
        }[];
    }>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        id: number;
        name: string;
        service: {
            id: number;
            name: string;
            createdAt: Date;
            description: string | null;
            duration: number;
            price: number;
            updatedAt: Date;
        }[];
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        atualizedAt: Date;
    }>;
    removeService(id: number, serviceId: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        atualizedAt: Date;
    }>;
}
