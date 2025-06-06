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

@Controller('appointments')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) { }

  @Post()
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
  @Roles('admin', 'client')
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

  @Get(':appointmentId')
  @Roles('admin', 'client')
  async getAppointmentUnique(@Param('appointmentId', ParseIntPipe) appointmentId: number) {
    const appointment = await this.appointmentsService.getAppointmentUnique(appointmentId)

    return appointment;
  }

  @Get('/historic-appointment/:clientId')
  @Roles('admin', 'client')
  async getAppointments(@Param('clientId', ParseIntPipe) clientId: number) {
    const appointments =
      await this.appointmentsService.getAppointments(clientId);

    return appointments;
  }

  @Patch(':id')
  @Roles('admin', 'client')
  async updateAppointment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateAppointmentDto,
    @Req() req,
  ) {
    if (req.user.role === 'client') {
      updateData = {
        status: updateData.status,
      } as UpdateAppointmentDto;
    }

    const result = await this.appointmentsService.updateAppointment(
      id,
      updateData,
      req.user.role === 'client' ? req.user.id : undefined,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Atualizado com sucesso',
      data: new AppointmentResponseDto(result),
    };
  }

  @Delete(':id')
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
