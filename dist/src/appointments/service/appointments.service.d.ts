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
    getHistoricAppointments(id: number, req: any): Promise<any>;
    getAllHistoricAppointments(): Promise<({
        service: {
            id: number;
            name: string;
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
