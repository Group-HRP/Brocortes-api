import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAppointmentDto } from '../DTO/create.appointments.dto';
import { UpdateAppointmentDto } from '../DTO/update.appointments.dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaClient) {}
  async createAppointment(createAppointmentsDto: CreateAppointmentDto) {
    try {
      const appointments = await this.prisma.appointment.create({
        data: {
          date: createAppointmentsDto.date,
          status: createAppointmentsDto.status,
          userId: createAppointmentsDto.userId,
          serviceId: createAppointmentsDto.serviceId,
        },
      });

      return appointments;
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao criar agendamento',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllAppointments() {
    try {
      const appointments = await this.prisma.appointment.findMany();

      return appointments;
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao buscar agendamentos',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateAppointment(
    id: number,
    updateData: UpdateAppointmentDto,
    userId?: number,
  ) {
    try {
      const existing = await this.prisma.appointment.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new NotFoundException('Agendamento não encontrado');
      }

      if (userId && existing.userId !== userId) {
        throw new ForbiddenException('Ação não permitida');
      }

      const updated = await this.prisma.appointment.update({
        where: { id },
        data: {
          ...updateData,
          updatedAt: new Date(),
        },
        include: {
          service: { select: { id: true, name: true } },
          user: { select: { id: true, name: true } },
        },
      });

      return updated;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Registro não encontrado');
      }

      throw new HttpException(
        error.message || 'Falha na atualização',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteAppointment(
    id: number,
    deleteData: {
      cancellationReason?: string;
      canceledBy: number;
    },
    userId?: number
  ) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id }
    });

    if (!appointment) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    if (userId && appointment.userId !== userId) {
      throw new ForbiddenException('Você só pode cancelar seus próprios agendamentos');
    }

    return this.prisma.appointment.update({
        where: { id },
        data: {
          status: 'canceled',
          cancellationReason: deleteData.cancellationReason,
          canceledById: deleteData.canceledBy,
          canceledAt: new Date()
        }
      });

    // return this.prisma.appointment.delete({ where: { id } });
  }
}
