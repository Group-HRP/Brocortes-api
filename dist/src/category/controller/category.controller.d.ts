import { CategoryService } from '../service/category.service';
import { CreateCategoryDto } from '../DTO/create-category.dto';
import { UpdateCategoryDto } from '../DTO/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
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
    findOne(id: string): Promise<{
        id: number;
        service: {
            id: number;
            name: string;
        }[];
        name: string;
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
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
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        atualizedAt: Date;
    }>;
    removeService(id: number, serviceId: object): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        atualizedAt: Date;
    }>;
}
