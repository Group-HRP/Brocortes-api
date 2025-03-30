import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isAdmin', async: false })
export class IsAdminConstraint implements ValidatorConstraintInterface {
  validate(role: string) {
    return role === 'admin';
  }

  defaultMessage() {
    return 'Apenas administradores podem realizar esta ação';
  }
}

export function IsAdmin(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAdminConstraint,
    });
  };
}