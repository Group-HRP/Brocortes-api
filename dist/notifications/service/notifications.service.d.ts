import { CreateNotificationDto } from '../DTO/create.notifications.dto';
import { PrismaClient } from '@prisma/client';
export declare class NotificationsService {
    private prisma;
    private transporter;
    constructor(prisma: PrismaClient);
    createAndSendNotification(createNotificationDto: CreateNotificationDto): Promise<{
        success: boolean;
        notificationId: number;
        error?: undefined;
    } | {
        success: boolean;
        notificationId: number;
        error: any;
    }>;
    getByUser(userId: number): Promise<{
        message: string;
        user: {
            name: string;
            email: string;
            id: number;
        };
        id: number;
        type: string;
        sentAt: Date;
    }[]>;
}
