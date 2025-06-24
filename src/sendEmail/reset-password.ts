import { Resend } from 'resend';

const resend = new Resend('re_DZduBwTW_PJBGsj5fKf82PfWPPNz3ATEc');

export default async function ResetPassword(codigo: string, email: string) {
  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: '03ramos011@gmail.com',
      subject: 'Código de verificação',
      html: `<strong>Seu código:</strong> ${codigo}`,
    });

    console.log('[email enviado]', response);
    return response;
  } catch (error) {
    console.error('[erro ao enviar e-mail]', error);
    throw new Error('Erro ao enviar o e-mail');
  }
}
