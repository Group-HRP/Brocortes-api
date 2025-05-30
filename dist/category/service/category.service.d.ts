import { CreateCategoryDto } from '../DTO/create-category.dto';
import { UpdateCategoryDto } from '../DTO/update-category.dto';
import { PrismaClient } from '@prisma/client';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaClient);
    serviceExisting(serviceId: number): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        duration: number;
        price: number;
    }>;
    create(createCategoryDto: CreateCategoryDto): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        atualizedAt: Date;
    }>;
    findAll(): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        atualizedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        id: number;
        service: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            duration: number;
            price: number;
        }[];
    }>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        name: string;
        id: number;
        service: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            duration: number;
            price: number;
        }[];
    }>;
    remove(id: number): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        atualizedAt: Date;
    }>;
    removeService(id: number, serviceId: number): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        atualizedAt: Date;
    }>;
}
