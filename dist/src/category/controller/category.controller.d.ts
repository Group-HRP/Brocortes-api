import { CategoryService } from '../service/category.service';
import { CreateCategoryDto } from '../DTO/create-category.dto';
import { UpdateCategoryDto } from '../DTO/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        atualizedAt: Date;
    }>;
    findAll(): Promise<{
        name: string;
        id: number;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: number;
        service: {
            name: string;
            id: number;
        }[];
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        name: string;
        id: number;
        service: {
            description: string | null;
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            duration: number;
            price: number;
        }[];
    }>;
    remove(id: string): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        atualizedAt: Date;
    }>;
    removeService(id: number, serviceId: object): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        atualizedAt: Date;
    }>;
}
