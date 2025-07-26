import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from '../service/notifications.service';
import { CreateNotificationDto } from '../DTO/create.notifications.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notifications')
@UseGuards(AuthGuard('jwt'))
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }


  @Post('register-token')
  @ApiOperation({ summary: "Notificacao push" })
  async registerToken(@Body() body: CreateNotificationDto) {

    const resgisterToken = await this.notificationsService.registerToken(body);
  }
}
