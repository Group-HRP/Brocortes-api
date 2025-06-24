import { SendCodingEmail } from '../DTO/send-coding-email.dto';
import { PrismaClient } from '@prisma/client';
import { ValidateCoding } from '../DTO/validate-coding.dto';
import { ResetPasswordDto } from '../DTO/reset-password.dto';
export declare class PasswordResetService {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    sendCodingEmail(sendCodingEmail: SendCodingEmail): Promise<{
        message: string;
    }>;
    validateCoding(validateCodingDto: ValidateCoding): Promise<{
        message: string;
        id: string;
        email: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
