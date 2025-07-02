import { HttpStatus } from '@nestjs/common';
import { AppointmentsService } from '../service/appointments.service';
import { CreateAppointmentDto } from '../DTO/create.appointments.dto';
import { UpdateAppointmentDto } from '../DTO/update.appointments.dto';
import { AppointmentResponseDto } from '../DTO/response.appointments.dto';
import { DeleteAppointmentDto } from '../DTO/delete.appointment.dto';
import { DeleteAppointmentResponseDto } from '../DTO/response.delete.appointment';
export declare class AppointmentsController {
    private appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    createAppointment(createAppointmentsDto: CreateAppointmentDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: AppointmentResponseDto;
    }>;
    getAllAppointments(req: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    } | undefined>;
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
    getHistoricAppointments(id: number, req: any): Promise<any>;
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
    deleteAppointment(id: number, deleteAppointment: DeleteAppointmentDto, req: any): Promise<DeleteAppointmentResponseDto>;
}
