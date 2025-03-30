import { Controller, Get, Req, UseGuards, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../service/user.service';
import { UserResponseDto } from '../DTO/user.response.dto';
import { AdminGuard } from '../guards/admin.guard';

@Controller('users')
@UseGuards(AuthGuard('jwt'), AdminGuard) // Usando dois guards: JWT e Admin
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getAllUsers(): Promise<UserResponseDto[]> {
        const users = await this.userService.getAllUsers();
        return users.map(user => new UserResponseDto(user));
    }
}