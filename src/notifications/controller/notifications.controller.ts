import {
  Body,
  Controller,
  Post,
  HttpStatus,
  Get,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { NotificationsService } from '../service/notifications.service';
import { CreateNotificationDto } from '../DTO/create.notifications.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar e enviar notificação' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Notificação criada e enviada com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos',
  })
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    const result = await this.notificationsService.createAndSendNotification(
      createNotificationDto,
    );

    return {
      statusCode: HttpStatus.CREATED,
      success: result.success,
      notificationId: result.notificationId,
      message: result.success
        ? 'Notificação registrada e enviada com sucesso'
        : 'Notificação registrada mas falhou ao enviar',
      error: result.error || undefined,
    };
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Listar notificações por usuário' })
  async getByUser(@Param('userId', ParseIntPipe) userId: number) {
    const notifications = await this.notificationsService.getByUser(userId);
    return {
      statusCode: HttpStatus.OK,
      data: notifications,
    };
  }
}
