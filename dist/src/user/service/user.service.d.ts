import { PrismaClient } from '@prisma/client';
import { UpdateUserDto } from '../DTO/user.update.dto';
import { DeleteUserDto } from '../DTO/user.delete.dto';
export declare class UserService {
    private prismaService;
    constructor(prismaService: PrismaClient);
    getAllUsers(): Promise<{
        id: number;
        name: string;
        email: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findByEmail(email: string): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUser(id: number, deleteUserDto?: DeleteUserDto): Promise<{
        sucesses: boolean;
    }>;
}
