import { PrismaClient } from '@prisma/client';
import { CreateAppointmentDto } from '../DTO/create.appointments.dto';
import { UpdateAppointmentDto } from '../DTO/update.appointments.dto';
export declare class AppointmentsService {
    private prisma;
    constructor(prisma: PrismaClient);
    createAppointment(createAppointmentsDto: CreateAppointmentDto): Promise<{
        id: number;
        userId: number;
        serviceId: number;
        date: Date;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        canceledAt: Date | null;
        canceledById: number | null;
        cancellationReason: string | null;
    }>;
    getAllAppointments(req: any): Promise<({
        service: {
            id: number;
            name: string;
            duration: number;
            price: number;
        };
    } & {
        id: number;
        userId: number;
        serviceId: number;
        date: Date;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        canceledAt: Date | null;
        canceledById: number | null;
        cancellationReason: string | null;
    })[]>;
    getAppointmentUnique(appointmentId: number): Promise<{
        service: {
            id: number;
            name: string;
            duration: number;
            price: number;
        };
    } & {
        id: number;
        userId: number;
        serviceId: number;
        date: Date;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        canceledAt: Date | null;
        canceledById: number | null;
        cancellationReason: string | null;
    }>;
    getAppointments(clientId: number): Promise<({
        service: {
            id: number;
            name: string;
            duration: number;
            price: number;
        };
    } & {
        id: number;
        userId: number;
        serviceId: number;
        date: Date;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        canceledAt: Date | null;
        canceledById: number | null;
        cancellationReason: string | null;
    })[]>;
    updateAppointment(id: number, updateData: UpdateAppointmentDto, userId?: number): Promise<{
        user: {
            id: number;
            name: string;
        };
        service: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        userId: number;
        serviceId: number;
        date: Date;
        status: string;
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
        id: number;
        userId: number;
        serviceId: number;
        date: Date;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        canceledAt: Date | null;
        canceledById: number | null;
        cancellationReason: string | null;
    }>;
}
