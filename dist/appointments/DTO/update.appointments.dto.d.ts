import { AppointmentStatus } from '../../enums/appointments.status.enum';
export declare class UpdateAppointmentDto {
    serviceId?: number;
    date?: Date;
    status?: AppointmentStatus;
}
