import { PrismaClient } from '@prisma/client';
import { CreateAppointmentDto } from '../DTO/create.appointments.dto';
import { UpdateAppointmentDto } from '../DTO/update.appointments.dto';
import { NotificationsService } from 'src/notifications/service/notifications.service';
export declare class AppointmentsService {
    private prisma;
    private notificationsService;
    constructor(prisma: PrismaClient, notificationsService: NotificationsService);
    createAppointment(createAppointmentsDto: CreateAppointmentDto): Promise<{
        userId: number;
        serviceId: number;
        date: Date;
        status: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        canceledAt: Date | null;
        canceledById: number | null;
        cancellationReason: string | null;
    }>;
    getAllAppointments(req: any): Promise<any>;
    getAppointmentUnique(appointmentId: number): Promise<{
        user: {
            name: string;
        };
        service: {
            id: number;
            name: string;
            duration: number;
            price: number;
        };
    } & {
        userId: number;
        serviceId: number;
        date: Date;
        status: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        canceledAt: Date | null;
        canceledById: number | null;
        cancellationReason: string | null;
    }>;
    getHistoricAppointments(id: number, req: any): Promise<any>;
    getAllHistoricAppointments(): Promise<({
        service: {
            id: number;
            name: string;
            duration: number;
            price: number;
        };
    } & {
        userId: number;
        serviceId: number;
        date: Date;
        status: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        canceledAt: Date | null;
        canceledById: number | null;
        cancellationReason: string | null;
    })[]>;
    updateAppointment(id: number, updateData: UpdateAppointmentDto, req: any): Promise<{
        user: {
            id: number;
            name: string;
        };
        service: {
            id: number;
            name: string;
        };
    } & {
        userId: number;
        serviceId: number;
        date: Date;
        status: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        canceledAt: Date | null;
        canceledById: number | null;
        cancellationReason: string | null;
    }>;
    deleteAppointment(id: number, deleteData: {
        cancellationReason?: string;
        canceledBy: number;
    }, userId?: number): Promise<{
        userId: number;
        serviceId: number;
        date: Date;
        status: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        canceledAt: Date | null;
        canceledById: number | null;
        cancellationReason: string | null;
    }>;
}
