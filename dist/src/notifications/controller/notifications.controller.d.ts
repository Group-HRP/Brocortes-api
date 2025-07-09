import { NotificationsService } from '../service/notifications.service';
import { CreateNotificationDto } from '../DTO/create.notifications.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    registerToken(body: CreateNotificationDto): Promise<void>;
}
