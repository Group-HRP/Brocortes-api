import {
  Body,
  Controller,
  Post,
  UseGuards,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { ServiceService } from '../service/service.service';
import { CreateServiceDto } from '../DTO/create.service.dto';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorator';
import { ServiceResponseDto } from '../DTO/response.service.dto';


@Controller('service')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @Roles('admin')
  async create(@Body() createServiceDto: CreateServiceDto) {
    try {
      const createdService = await this.serviceService.create(createServiceDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Service created successfully',
        data: createdService,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error while creating service',
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @Roles('admin', 'client')
  async findAll() {
    const services = await this.serviceService.findAll();

    return {
      statusCode: HttpStatus.OK,
      message: 'Serviços listados com sucesso',
      data: services.map(services => new ServiceResponseDto(services))
    }
  }

  
}
