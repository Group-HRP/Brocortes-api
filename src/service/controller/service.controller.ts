import {
  Body,
  Controller,
  Post,
  UseGuards,
  HttpException,
  HttpStatus,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServiceService } from '../service/service.service';
import { CreateServiceDto } from '../DTO/create.service.dto';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorator';
import { ServiceResponseDto } from '../DTO/response.service.dto';
import { UpdateServiceDto } from '../DTO/update.service.dto';
import { DeleteServiceOptionsDto } from '../DTO/delete.service.dto';

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
      data: services.map((services) => new ServiceResponseDto(services)),
    };
  }

  @Get("/category/:categoryId")
  @Roles('admin')
  async findOneServiceNotCategory(@Param('categoryId') categoryId: number) {
    const service = await this.serviceService.findOneServiceNotCategory(categoryId);
  }

  @Patch(':id')
  @Roles('admin')
  async update(
    @Param('id') id: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    try {
      const updatedService = await this.serviceService.update(
        id,
        updateServiceDto,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Serviço atualizado com sucesso',
        data: updatedService,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Erro ao atualizar serviço',
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @Roles('admin')
  async remove(
    @Param('id') id: number,
    @Body() deleteServiceOptionsDto: DeleteServiceOptionsDto,
  ) {
    try {
      await this.serviceService.remove(id, deleteServiceOptionsDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Serviço removido com sucesso',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Erro ao remover serviço',
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
