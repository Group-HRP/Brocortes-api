import { ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { UserService } from '../user/service/user.service';
export declare class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
    private readonly userService;
    constructor(userService: UserService);
    validate(email: string): Promise<boolean>;
    defaultMessage(): string;
}
export declare function IsEmailUnique(validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
