import { PasswordResetService } from '../service/password-reset.service';
import { SendCodingEmail } from '../DTO/send-coding-email.dto';
import { ValidateCoding } from '../DTO/validate-coding.dto';
import { ResetPasswordDto } from '../DTO/reset-password.dto';
export declare class PasswordResetController {
    private readonly passwordResetService;
    constructor(passwordResetService: PasswordResetService);
    sendCodingEmail(sendCodingEmail: SendCodingEmail): Promise<{
        message: string;
    }>;
    validateCoding(validateCondig: ValidateCoding): Promise<{
        message: string;
        id: string;
        email: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
