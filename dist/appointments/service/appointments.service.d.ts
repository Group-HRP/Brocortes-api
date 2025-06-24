import { PrismaClient } from '@prisma/client';
import { CreateAppointmentDto } from '../DTO/create.appointments.dto';
import { UpdateAppointmentDto } from '../DTO/update.appointments.dto';
export declare class AppointmentsService {
    private prisma;
    constructor(prisma: PrismaClient);
    createAppointment(createAppointmentsDto: CreateAppointmentDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        serviceId: number;
        date: Date;
        status: string;
        canceledAt: Date | null;
        canceledById: number | null;
        cancellationReason: string | null;
    }>;
    getAllAppointments(req: any): Promise<({
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
        userId: number;
        serviceId: number;
        date: Date;
        status: string;
        canceledAt: Date | null;
        canceledById: number | null;
        cancellationReason: string | null;
    })[]>;
    getAppointmentUnique(appointmentId: number): Promise<{
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
        userId: number;
        serviceId: number;
        date: Date;
        status: string;
        canceledAt: Date | null;
        canceledById: number | null;
        cancellationReason: string | null;
    }>;
    getAppointments(clientId: number): Promise<({
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
        userId: number;
        serviceId: number;
        date: Date;
        status: string;
        canceledAt: Date | null;
        canceledById: number | null;
        cancellationReason: string | null;
    })[]>;
    updateAppointment(id: number, updateData: UpdateAppointmentDto, userId?: number): Promise<{
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
        userId: number;
        serviceId: number;
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
        userId: number;
        serviceId: number;
        date: Date;
        status: string;
        canceledAt: Date | null;
        canceledById: number | null;
        cancellationReason: string | null;
    }>;
}
