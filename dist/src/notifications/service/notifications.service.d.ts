import { CreateNotificationDto } from '../DTO/create.notifications.dto';
import { PrismaClient } from '@prisma/client';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaClient);
    sendPushNotification(expoToken: string, title: string, message: string): Promise<any>;
    registerToken(body: CreateNotificationDto): Promise<{
        message: string;
    }>;
}
