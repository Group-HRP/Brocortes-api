import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'ConfirmDeletion', async: false })
export class ConfirmDeletionConstraint implements ValidatorConstraintInterface {
  validate(confirmation: string) {
    return confirmation === 'DELETE';
  }

  defaultMessage() {
    return 'Confirme a deleção com "DELETE"';
  }
}

export function ConfirmDeletion(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ConfirmDeletionConstraint,
    });
  };
}
