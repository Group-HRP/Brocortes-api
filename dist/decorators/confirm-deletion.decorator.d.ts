import { ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class ConfirmDeletionConstraint implements ValidatorConstraintInterface {
    validate(confirmation: string): confirmation is "DELETE";
    defaultMessage(): string;
}
export declare function ConfirmDeletion(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
