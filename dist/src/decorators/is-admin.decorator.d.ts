import { ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class IsAdminConstraint implements ValidatorConstraintInterface {
    validate(role: string): role is "admin";
    defaultMessage(): string;
}
export declare function IsAdmin(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
