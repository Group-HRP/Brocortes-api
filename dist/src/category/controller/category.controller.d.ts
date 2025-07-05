import { CategoryService } from '../service/category.service';
import { CreateCategoryDto } from '../DTO/create-category.dto';
import { UpdateCategoryDto } from '../DTO/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
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
    findOne(id: string): Promise<{
        id: number;
        name: string;
        service: {
            id: number;
            name: string;
        }[];
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
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
    remove(id: string): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        atualizedAt: Date;
    }>;
    removeService(id: string, serviceId: string): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        atualizedAt: Date;
    }>;
}
