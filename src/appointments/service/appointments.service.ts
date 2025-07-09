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
import { NotificationsService } from 'src/notifications/service/notifications.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaClient, private notificationsService: NotificationsService) { }
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

      const usersToNotify = await this.prisma.user.findMany({
        where: {
          role: { in: ['professional', 'admin'] },
          PushToken: {
            some: {},
          },
        },
        include: {
          PushToken: true,
        },
      });

      for (const user of usersToNotify) {
        for (const pushToken of user.PushToken) {
          await this.notificationsService.sendPushNotification(
            pushToken.token,
            'Novo agendamento criado',
            `Um cliente acabou de agendar um horário.`,
          );

          await this.prisma.notification.create({
            data: {
              userId: user.id,
              message: 'Um novo agendamento foi criado por um cliente.',
              type: 'appointment',
            },
          });
        }
      }

      return appointments;
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao criar agendamento',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllAppointments(req) {
    const user = req.user.id;
    const userRole = req.user.role;

    let appointments;

    if (userRole === 'admin') {
      appointments = await this.prisma.appointment.findMany({
        where: {
          status: 'scheduled',
        },
        include: {
          service: {
            select: { id: true, name: true, duration: true, price: true },
          },
          user: {
            select: { id: true, name: true },
          },
        },
        orderBy: {
          date: 'asc',
        },
      });

      if (!appointments || appointments.length === 0) {
        throw new NotFoundException('Nenhum agendamento encontrado');
      }

      return appointments;
    }

    appointments = await this.prisma.appointment.findMany({
      where: {
        userId: user,
      },
      include: {
        service: {
          select: { id: true, name: true, duration: true, price: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!appointments || appointments.length === 0) {
      throw new NotFoundException('Nenhum agendamento encontrado');
    }

    return appointments;
  }

  async getAppointmentUnique(appointmentId: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        service: {
          select: {
            id: true,
            name: true,
            duration: true,
            price: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!appointment)
      throw new NotFoundException('Serviço não encontrado' + appointmentId);

    return appointment;
  }

  async getHistoricAppointments(id: number, req) {
    const userId = req.user.id;
    const userRole = req.user.role;
    let appointments;

    if (userRole === 'client') {
      appointments = await this.prisma.appointment.findMany({
        where: {
          userId: userId,
          id: id,
          status: {
            in: ['completed', 'canceled'],
          },
        },
        include: {
          service: {
            select: {
              id: true,
              name: true,
              duration: true,
              price: true,
            },
          },
        },

        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!appointments || appointments.length === 0) {
        throw new NotFoundException('Nenhum agendamento encontrado');
      }

      return appointments;
    }

    appointments = await this.prisma.appointment.findMany({
      where: {
        id: id,
        status: {
          in: ['completed', 'canceled'],
        },
      },
      include: {
        service: {
          select: {
            id: true,
            name: true,
            duration: true,
            price: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!appointments || appointments.length === 0) {
      throw new NotFoundException('Nenhum agendamento encontrado');
    }

    return appointments;
  }

  async getAllHistoricAppointments() {
    const appointments = await this.prisma.appointment.findMany({
      where: {
        status: {
          in: ['completed', 'canceled'],
        },
      },
      include: {
        service: {
          select: {
            id: true,
            name: true,
            duration: true,
            price: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!appointments || appointments.length === 0) {
      throw new NotFoundException('Nenhum agendamento encontrado');
    }

    return appointments;
  }

async updateAppointment(id: number, updateData: UpdateAppointmentDto, req) {
  try {
    const userId = req.user?.id;
    const userRole = req.user?.role;

    const existing = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        user: true,
        service: true,
      },
    });

    if (!existing) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    if (userId && existing.userId !== userId && userRole !== 'admin') {
      throw new ForbiddenException('Ação não permitida');
    }

    const updated = await this.prisma.appointment.update({
      where: { id },
      data: {
        ...updateData,
        canceledById: updateData.canceledById
          ? Number(updateData.canceledById)
          : null,
        updatedAt: new Date(),
      },
      include: {
        service: { select: { id: true, name: true } },
        user: { select: { id: true, name: true } },
      },
    });

    if (updateData.status === 'canceled') {
      const [clientTokens, professionalUsers] = await Promise.all([
        this.prisma.pushToken.findMany({
          where: { userId: existing.userId },
        }),

        this.prisma.user.findMany({
          where: {
            role: { in: ['professional', 'admin'] },
            PushToken: { some: {} },
          },
          include: { PushToken: true },
        }),
      ]);

      for (const token of clientTokens) {
        await this.notificationsService.sendPushNotification(
          token.token,
          'Seu agendamento foi cancelado',
          `O agendamento do serviço "${existing.service.name}" foi cancelado.`,
        );

        await this.prisma.notification.create({
          data: {
            userId: existing.userId,
            message: `Seu agendamento do serviço "${existing.service.name}" foi cancelado.`,
            type: 'appointment-canceled',
          },
        });
      }

      for (const prof of professionalUsers) {
        for (const token of prof.PushToken) {
          await this.notificationsService.sendPushNotification(
            token.token,
            'Agendamento cancelado',
            `Um cliente cancelou o agendamento do serviço "${existing.service.name}".`,
          );

          await this.prisma.notification.create({
            data: {
              userId: prof.id,
              message: `O cliente ${existing.user.name} cancelou o serviço "${existing.service.name}".`,
              type: 'appointment-canceled',
            },
          });
        }
      }
    }

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
    userId?: number,
  ) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    if (userId && appointment.userId !== userId) {
      throw new ForbiddenException(
        'Você só pode cancelar seus próprios agendamentos',
      );
    }

    return this.prisma.appointment.update({
      where: { id },
      data: {
        status: 'canceled',
        cancellationReason: deleteData.cancellationReason,
        canceledById: deleteData.canceledBy,
        canceledAt: new Date(),
      },
    });

    // return this.prisma.appointment.delete({ where: { id } });
  }
}
