import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from '../service/appointments.service';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { CreateAppointmentDto } from '../DTO/create.appointments.dto';
import { UpdateAppointmentDto } from '../DTO/update.appointments.dto';
import { AppointmentResponseDto } from '../DTO/response.appointments.dto';
import { DeleteAppointmentDto } from '../DTO/delete.appointment.dto';
import { DeleteAppointmentResponseDto } from '../DTO/response.delete.appointment';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('appointments')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) { }

  @Post()
  @ApiOperation({ summary: "Cria um agemdamento" })
  @Roles('admin', 'client')
  async createAppointment(@Body() createAppointmentsDto: CreateAppointmentDto) {
    try {
      const appointments = await this.appointmentsService.createAppointment(
        createAppointmentsDto,
      );
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Agendamento criado com sucesso',
        data: new AppointmentResponseDto(appointments),
      };
    } catch (error) {
      throw new HttpException(
        error.statusCode || HttpStatus.BAD_REQUEST,
        error.message || error.message,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: "Lista todos os agendametos para o usuario" })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        message: "Todos os agendamentos listado",
        appointment: {
          id: 10,
          userId: 6,
          serviceId: 2,
          date: "2025-06-30T09:00:00.000Z",
          status: "scheduled",
          createdAt: "2025-07-07T01:53:27.972Z",
          updatedAt: "2025-07-07T01:53:27.972Z",
          canceledAt: null,
          canceledById: null,
          cancellationReason: null,
          service: {
            id: 2,
            name: "Corte de Cabelo",
            duration: 15,
            price: 10
          },
          user: {
            id: 6,
            name: "ryan"
          }
        },
      }
    }
  })
  @Roles('admin', 'client', 'professional')
  async getAllAppointments(@Req() req) {
    try {
      const appointments =
        await this.appointmentsService.getAllAppointments(req);
      return {
        statusCode: HttpStatus.OK,
        message: 'Agendamentos encontrados com sucesso',
        data: appointments,
      };
    } catch (error) { }
  }

  @Get('/historic-appointment')
  @ApiOperation({ summary: "Lista todo o historico de agendameto para o professional e o admin" })
  @ApiResponse({
    status: 200,
    description: "Lista todo o historico",
    example: {
      id: 5,
      userId: 2,
      serviceId: 1,
      date: "2025-06-29T14:30:00.000Z",
      status: "canceled",
      createdAt: "2025-06-29T20:19:51.254Z",
      updatedAt: "2025-06-29T20:38:22.865Z",
      canceledAt: "2025-06-29T20:38:23.996Z",
      canceledById: 1,
      cancellationReason: null,
      service: {
        id: 1,
        name: "Sobrancelha",
        duration: 15,
        price: 10
      }
    }
  })
  @Roles('admin', 'professional')
  async getAllHistoricAppointments() {
    const appointments =
      await this.appointmentsService.getAllHistoricAppointments();

    return appointments;
  }

  @Get('/historic-appointment/:id')
  @ApiOperation({ summary: "Lista um historico especifico" })
  @ApiResponse({
    status: 200,
    description: "Lista historico por ID",
    schema: {
      example: {
        id: 1,
        userId: 2,
        serviceId: 1,
        date: "2023-12-15T14:30:00.000Z",
        status: "completed",
        createdAt: "2025-06-28T19:23:49.550Z",
        updatedAt: "2025-06-29T21:12:46.266Z",
        canceledAt: "2025-06-29T15:19:39.833Z",
        canceledById: null,
        cancellationReason: null,
        service: {
          id: 1,
          name: "Sobrancelha",
          duration: 15,
          price: 10
        },
        user: {
          name: "Pedro Paraiso"
        }
      },
    }
  })
  @Roles('admin', 'client', 'professional')
  async getHistoricAppointments(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ) {
    const appointments = await this.appointmentsService.getHistoricAppointments(
      id,
      req,
    );

    return appointments;
  }

  @Get(':appointmentId')
  @ApiOperation({ summary: "Lista um agemdamento especifico" })
  @ApiResponse({
    status: 200,
    description: 'Appointment details',
    schema: {
      example: {
        id: 2,
        userId: 2,
        serviceId: 1,
        date: "2025-12-15T14:30:00.000Z",
        status: "scheduled",
        createdAt: "2025-06-28T19:24:18.076Z",
        updatedAt: "2025-06-28T19:24:18.076Z",
        canceledAt: null,
        canceledById: null,
        cancellationReason: null,
        service: {
          id: 1,
          name: "Sobrancelha",
          duration: 15,
          price: 10
        },
        user: {
          name: "Pedro Paraiso"
        }
      }
    }
  })
  @Roles('admin', 'client')
  async getAppointmentUnique(
    @Param('appointmentId', ParseIntPipe) appointmentId: number,
  ) {
    const appointment =
      await this.appointmentsService.getAppointmentUnique(appointmentId);

    return appointment;
  }

  @Patch(':id')
  @ApiOperation({ summary: "Atualiza um agemdamento" })
  @Roles('admin', 'client')
  async updateAppointment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateAppointmentDto,
    @Req() req,
  ) {
    const appointment = await this.appointmentsService.updateAppointment(
      id,
      updateData,
      req,
    );

    return appointment;
  }

  @Delete(':id')
  @ApiOperation({ summary: "Deleta um agemdamento" })
  @Roles('admin')
  async deleteAppointment(
    @Param('id', ParseIntPipe) id: number,
    @Body() deleteAppointment: DeleteAppointmentDto,
    @Req() req,
  ): Promise<DeleteAppointmentResponseDto> {
    if (!deleteAppointment.confirm) {
      throw new BadRequestException('Confirme o cancelamento com confirm=true');
    }
    const userId = req.user.role === 'client' ? req.user.id : undefined;
    const result = await this.appointmentsService.deleteAppointment(
      id,
      {
        cancellationReason: deleteAppointment.cancellationReason,
        canceledBy: req.user.id,
      },
      userId,
    );

    return {
      success: true,
      message:
        req.user.role === 'admin'
          ? 'Agendamento deletado permanentemente'
          : 'Agendamento cancelado',
      appointmentId: id,
      canceledAt: new Date(),
    };
  }
}
