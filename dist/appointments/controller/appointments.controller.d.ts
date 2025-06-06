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
        data: ({
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
        })[];
    } | undefined>;
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
    updateAppointment(id: number, updateData: UpdateAppointmentDto, req: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: AppointmentResponseDto;
    }>;
    deleteAppointment(id: number, deleteAppointment: DeleteAppointmentDto, req: any): Promise<DeleteAppointmentResponseDto>;
}
