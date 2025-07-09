import { CreateCategoryDto } from '../DTO/create-category.dto';
import { UpdateCategoryDto } from '../DTO/update-category.dto';
import { PrismaClient } from '@prisma/client';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaClient);
    serviceExisting(serviceObj: any): Promise<{
        description: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        duration: number;
        price: number;
    }>;
    create(createCategoryDto: CreateCategoryDto): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        atualizedAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        service: {
            id: number;
            name: string;
        }[];
        name: string;
    }>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        id: number;
        service: {
            description: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            duration: number;
            price: number;
        }[];
        name: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        atualizedAt: Date;
    }>;
    removeService(id: number, serviceObj: any): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        atualizedAt: Date;
    }>;
}
