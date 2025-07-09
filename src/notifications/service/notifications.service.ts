import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from '../DTO/create.notifications.dto';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class NotificationsService {

  constructor(private prisma: PrismaClient) { }

  async sendPushNotification(expoToken: string, title: string, message: string) {
    const body = {
      to: expoToken,
      title,
      body: message,
      sound: 'default',
    };

    try {
      const response = await axios.post('https://exp.host/--/api/v2/push/send', body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.log("Erro ao enviar notificacao", error.response?.data || error.message)
      throw error;
    }
  }

  async registerToken(body: CreateNotificationDto) {
    const { token, userId } = body;

    const existingToken = await this.prisma.pushToken.findFirst({
      where: { token },
    });

    if (!existingToken) {
      await this.prisma.pushToken.create({
        data: {
          token,
          userId,
        }
      })
    }

    return { message: 'Token registrado com sucesso!'}
  }
}
