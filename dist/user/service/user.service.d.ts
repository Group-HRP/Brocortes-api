import { PrismaClient } from '@prisma/client';
import { UpdateUserDto } from '../DTO/user.update.dto';
import { DeleteUserDto } from '../DTO/user.delete.dto';
export declare class UserService {
    private prismaService;
    constructor(prismaService: PrismaClient);
    getAllUsers(): Promise<{
        name: string;
        email: string;
        role: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findByEmail(email: string): Promise<{
        name: string;
        email: string;
        password: string;
        role: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        email: string;
        password: string;
        role: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUser(id: number, deleteUserDto?: DeleteUserDto): Promise<{
        sucesses: boolean;
    }>;
}
