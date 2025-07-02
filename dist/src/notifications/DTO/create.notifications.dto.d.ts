export declare enum NotificationType {
    EMAIL = "email",
    SYSTEM = "system",
    PUSH = "push"
}
export declare class CreateNotificationDto {
    userId: number;
    email: string;
    subject: string;
    message: string;
    type: NotificationType;
    html?: string;
}
