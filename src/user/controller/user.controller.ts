import { Controller, Get, Req, UseGuards, Put, Param, Body, ForbiddenException, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../service/user.service';
import { UserResponseDto } from '../DTO/user.response.dto';
import { AdminGuard } from '../guards/admin.guard';
import { UpdateUserDto } from '../DTO/user.update.dto';
import { UpdateUserResponseDto } from '../DTO/user.update.response.dto';
import { DeleteUserResponseDto } from '../DTO/user.delete.response.dto';
import { DeleteUserDto } from '../DTO/user.delete.dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @UseGuards(AdminGuard)
    async getAllUsers(): Promise<UserResponseDto[]> {
        const users = await this.userService.getAllUsers();
        return users.map(user => new UserResponseDto(user));
    }

    @Put(':id')
    async updateUser(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto,
        @Req() req
    ): Promise<UpdateUserResponseDto> {

        const userId = Number(req.user.id);
        const paramId = Number(id);

        if (req.user.role !== 'admin' && userId !== paramId) {
            throw new ForbiddenException('Você só pode atualizar seu próprio perfil');
        }

        if (req.user.role !== 'admin' && updateUserDto.role && updateUserDto.role !== req.user.role) {
            throw new ForbiddenException('Apenas administradores podem alterar roles');
        }

        const updateUser = await this.userService.updateUser(userId, updateUserDto);
        return new UpdateUserResponseDto(updateUser);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number,
        @Body() deleteUserDto: DeleteUserDto,
        @Req() req
    ): Promise<DeleteUserResponseDto> {
        const userId = Number(req.user.id);
        const paramId = Number(id);

        if (req.user.role !== 'admin' && userId !== paramId) {
            throw new ForbiddenException('Você só pode deletar seu próprio perfil');
        }

        if (req.user.role !== 'admin' && !deleteUserDto.password) {
            throw new ForbiddenException('Confirme sua senha para deletar a conta');
        }

        const result = await this.userService.deleteUser(paramId, deleteUserDto);
        return new DeleteUserResponseDto({
            success: true,
            message: 'Usuário deletado com sucesso',
            deletedUserId: paramId,
        });
    }
}