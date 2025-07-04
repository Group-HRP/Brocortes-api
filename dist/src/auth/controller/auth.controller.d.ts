import { HttpStatus } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RegisterDTO } from '../DTO/auth.register.dto';
import { LoginDTO } from '../DTO/auth.login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    registerUser(registerDTO: RegisterDTO): Promise<{
        StatusCode: HttpStatus;
        message: string;
        data: {
            user: {
                id: number;
                name: string;
                email: string;
                password: string;
                role: string;
                createdAt: Date;
                updatedAt: Date;
            };
        };
    }>;
    loginUser(loginDTO: LoginDTO): Promise<{
        access_token: string;
        payload: {
            sub: number;
            email: string;
            role: string;
            name: string;
        };
    }>;
}
