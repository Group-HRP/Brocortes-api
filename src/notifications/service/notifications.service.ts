import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { NotificationType } from '../DTO/create.notifications.dto';
import { CreateNotificationDto } from '../DTO/create.notifications.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class NotificationsService {
  private transporter;

  constructor(private prisma: PrismaClient) {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async createAndSendNotification(
    createNotificationDto: CreateNotificationDto,
  ) {
    const notification = await this.prisma.notification.create({
      data: {
        userId: createNotificationDto.userId,
        message: createNotificationDto.message,
        type: createNotificationDto.type,
      },
    });

    if (createNotificationDto.type === NotificationType.EMAIL) {
      try {
        await this.transporter.sendMail({
          from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
          to: createNotificationDto.email,
          subject: createNotificationDto.subject,
          text: createNotificationDto.message,
          html: createNotificationDto.html,
        });

        await this.prisma.notification.update({
          where: { id: notification.id },
          data: { sentAt: new Date() },
        });

        return {
          success: true,
          notificationId: notification.id,
        };
      } catch (error) {
        return {
          success: false,
          notificationId: notification.id,
          error: error.message,
        };
      }
    }

    return {
      success: true,
      notificationId: notification.id,
    };
  }

  async getByUser(userId: number) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { sentAt: 'desc' },
      select: {
        id: true,
        message: true,
        type: true,
        sentAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }
}
