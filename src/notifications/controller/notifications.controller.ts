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
import { PrismaClient } from '@prisma/client';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }


  @Post('register-token')
  async registerToken(@Body() body: CreateNotificationDto) {
    
    const resgisterToken = await this.notificationsService.registerToken(body);
  }
}
