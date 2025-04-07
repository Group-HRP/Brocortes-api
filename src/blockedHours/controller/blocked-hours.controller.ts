import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BlockedHoursService } from '../service/blocked-hours.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { CreateBlockedHoursDto } from '../DTO/create.blockedHours.dto';
import { BlockedHoursFilterDto } from '../DTO/filter.blockedHours.dto';
import { BlockedHoursResponseDto } from '../DTO/response.blockedHours.dto';

@Controller('blocked-hours')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class BlockedHoursController {
  constructor(private readonly blockedHoursService: BlockedHoursService) {}

  @Post()
  @Roles('admin')
  async createBlockedHours(@Body() createBlockedHours: CreateBlockedHoursDto) {
    try {
      const blockedHours =
        await this.blockedHoursService.createBlockedHours(createBlockedHours);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Horário bloqueado criado com sucesso',
        data: blockedHours,
      };
    } catch (error) {
      throw new HttpException(
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message || error.message,
      );
    }
  }

  @Get()
  @Roles('admin', 'client')
  async getBlockedHours(@Query() filters: BlockedHoursFilterDto) {
    try {
      const blockedHours =
        await this.blockedHoursService.getBlockedHours(filters);
      return {
        statusCode: HttpStatus.OK,
        message: 'Horários bloqueados encontrados com sucesso',
        data: blockedHours.map((bh) => new BlockedHoursResponseDto(bh)),
      };
    } catch (error) {
      throw new HttpException(
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message || error.message,
      );
    }
  }

  @Delete(':id')
  @Roles('admin')
  async deleteBlockedHours(@Param('id', ParseIntPipe) id: number) {
    if (!id) {
      throw new HttpException(
        'Horario bloqueado não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const blockedHours = await this.blockedHoursService.deleteBlockedHours(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Horário bloqueado deletado com sucesso',
      data: blockedHours,
    };
  }
}
