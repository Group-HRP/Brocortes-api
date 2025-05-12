import { UserService } from '../service/user.service';
import { UserResponseDto } from '../DTO/user.response.dto';
import { UpdateUserDto } from '../DTO/user.update.dto';
import { UpdateUserResponseDto } from '../DTO/user.update.response.dto';
import { DeleteUserResponseDto } from '../DTO/user.delete.response.dto';
import { DeleteUserDto } from '../DTO/user.delete.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<UserResponseDto[]>;
    updateUser(id: number, updateUserDto: UpdateUserDto, req: any): Promise<UpdateUserResponseDto>;
    deleteUser(id: number, deleteUserDto: DeleteUserDto, req: any): Promise<DeleteUserResponseDto>;
}
