"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResetPassword;
const resend_1 = require("resend");
const resend = new resend_1.Resend('re_DZduBwTW_PJBGsj5fKf82PfWPPNz3ATEc');
async function ResetPassword(codigo, email) {
    try {
        const response = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: '03ramos011@gmail.com',
            subject: 'Código de verificação',
            html: `<strong>Seu código:</strong> ${codigo}`,
        });
        console.log('[email enviado]', response);
        return response;
    }
    catch (error) {
        console.error('[erro ao enviar e-mail]', error);
        throw new Error('Erro ao enviar o e-mail');
    }
}
//# sourceMappingURL=reset-password.js.map