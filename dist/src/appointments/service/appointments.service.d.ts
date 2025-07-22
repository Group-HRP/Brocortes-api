import { PrismaClient } from '@prisma/client';
import { CreateAppointmentDto } from '../DTO/create.appointments.dto';
import { UpdateAppointmentDto } from '../DTO/update.appointments.dto';
import { NotificationsService } from 'src/notifications/service/notifications.service';
export declare class AppointmentsService {
    private prisma;
    private notificationsService;
    constructor(prisma: PrismaClient, notificationsService: NotificationsService);
    createAppointment(createAppointmentsDto: CreateAppointmentDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        serviceId: number;
        userId: number;
        date: Date;
        status: string;
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
            name: string;
            id: number;
            duration: number;
            price: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        serviceId: number;
        userId: number;
        date: Date;
        status: string;
        canceledAt: Date | null;
        canceledById: number | null;
        cancellationReason: string | null;
    }>;
    getHistoricAppointments(id: number, req: any): Promise<any>;
    getAllHistoricAppointments(req: any): Promise<({
        service: {
            name: string;
            id: number;
            duration: number;
            price: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        serviceId: number;
        userId: number;
        date: Date;
        status: string;
        canceledAt: Date | null;
        canceledById: number | null;
        cancellationReason: string | null;
    })[]>;
    updateAppointment(id: number, updateData: UpdateAppointmentDto, req: any): Promise<{
        user: {
            name: string;
            id: number;
        };
        service: {
            name: string;
            id: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        serviceId: number;
        userId: number;
        date: Date;
        status: string;
        canceledAt: Date | null;
        canceledById: number | null;
        cancellationReason: string | null;
    }>;
    deleteAppointment(id: number, deleteData: {
        cancellationReason?: string;
        canceledBy: number;
    }, userId?: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        serviceId: number;
        userId: number;
        date: Date;
        status: string;
        canceledAt: Date | null;
        canceledById: number | null;
        cancellationReason: string | null;
    }>;
}
