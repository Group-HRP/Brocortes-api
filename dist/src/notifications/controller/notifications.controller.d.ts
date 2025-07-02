import { HttpStatus } from '@nestjs/common';
import { NotificationsService } from '../service/notifications.service';
import { CreateNotificationDto } from '../DTO/create.notifications.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    createNotification(createNotificationDto: CreateNotificationDto): Promise<{
        statusCode: HttpStatus;
        success: boolean;
        notificationId: number;
        message: string;
        error: any;
    }>;
    getByUser(userId: number): Promise<{
        statusCode: HttpStatus;
        data: {
            user: {
                id: number;
                name: string;
                email: string;
            };
            id: number;
            message: string;
            type: string;
            sentAt: Date;
        }[];
    }>;
}
