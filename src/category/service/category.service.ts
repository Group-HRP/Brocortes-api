import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from '../DTO/create-category.dto';
import { UpdateCategoryDto } from '../DTO/update-category.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaClient) { }

  async serviceExisting(serviceId: number) {
    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      throw new NotFoundException('Servico nâo encontrado');
    }

    return service;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const { name, serviceIds } = createCategoryDto;

    const services = await this.prisma.service.findMany({
      where: {
        id: { in: serviceIds },
      },
    });

    if (services.length !== serviceIds.length) {
      throw new BadRequestException('Um ou mais serviços não existem');
    }

    const category = await this.prisma.category.create({
      data: {
        name,
        service: {
          connect: serviceIds.map((id) => ({ id }))
        }
      },
    });

    return category;
  }

  async findAll() {
    return this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
  }

  async findOne(id: number) {
    const categoryList = await this.prisma.category.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        service: {
          select: {
            id: true,
            name: true
          }
        },
      },
    });

    if (!categoryList) {
      throw new NotFoundException('Nenhuma cateogria encontrada');
    }

    return categoryList;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categoryExisting = await this.findOne(id);

    if (!categoryExisting) {
      throw new NotFoundException('Categoria não encontrada');
    }

    if (!updateCategoryDto.serviceIds || updateCategoryDto.serviceIds.length === 0) {
      throw new BadRequestException('Serviços não informados');
    }

    const serviceExisting = await this.prisma.service.findMany({
      where: {
        id: {
          in: updateCategoryDto.serviceIds,
        },
      },
    });

    if (!serviceExisting) {
      throw new NotFoundException('Um ou mais serviços não encontrados');
    }

    const categoryUpdate = await this.prisma.category.update({
      where: { id: id },
      data: {
        name: updateCategoryDto.name,
        service: {
          set: updateCategoryDto.serviceIds.map((id) => ({ id })),
        },
      },
      select: {
        id: true,
        name: true,
        service: true,
      },
    });

    return categoryUpdate;
  }


  async remove(id: number) {
    const categoryExisting = await this.findOne(id);

    const categoryDelete = await this.prisma.category.delete({
      where: { id: id },
    });

    return categoryDelete;
  }

  async removeService(id: number, serviceId: number) {
    const categoryExisting = await this.findOne(id);

    const serviceExisting = await this.serviceExisting(serviceId);

    const serviceDelete = await this.prisma.category.update({
      where: { id: serviceId },
      data: {
        service: {
          disconnect: { id: serviceId },
        },
      },
    });
    return serviceDelete;
  }
}
