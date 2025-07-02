import { CreateCategoryDto } from '../DTO/create-category.dto';
import { UpdateCategoryDto } from '../DTO/update-category.dto';
import { PrismaClient } from '@prisma/client';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaClient);
    serviceExisting(serviceId: number): Promise<{
        id: number;
        name: string;
        description: string | null;
        duration: number;
        price: number;
        createdAt: Date;
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
        service: {
            id: number;
            name: string;
        }[];
        id: number;
        name: string;
    }>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        service: {
            id: number;
            name: string;
            description: string | null;
            duration: number;
            price: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        id: number;
        name: string;
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
