import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateServiceDto } from '../DTO/create.service.dto';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaClient) { }

  async create(createServiceDto: CreateServiceDto) {
    try {
      if (createServiceDto.duration <= 0) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Duration must be greater than 0',
            error: 'Bad Request',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (createServiceDto.price <= 0) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Price must be greater than 0',
            error: 'Bad Request',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const service = await this.prisma.service.create({
        data: createServiceDto,
      });

      return service;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException(
          {
            statusCode: HttpStatus.CONFLICT,
            message: 'Service with this name already exists',
            error: 'Conflict',
          },
          HttpStatus.CONFLICT,
        );
      }

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create service',
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const services = await this.prisma.service.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          duration: true,
          price: true,
          createdAt: true,
          updatedAt: true,
        }
      })
      return services;
    } catch (error) {
      throw new HttpException(
        error.message || 'Falha ao listar serviços',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
