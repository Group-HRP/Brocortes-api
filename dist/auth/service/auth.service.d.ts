import { PrismaClient } from '@prisma/client';
import { RegisterDTO } from '../DTO/auth.register.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaClient, jwtService: JwtService);
    registerUser(user: RegisterDTO): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            password: string;
            role: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    validateUser(email: string, password: string): Promise<{
        id: number;
        email: string;
        role: string;
    }>;
    login(user: {
        id: number;
        email: string;
        role: string;
    }): Promise<{
        access_token: string;
        payload: {
            sub: number;
            email: string;
            role: string;
        };
    }>;
}
