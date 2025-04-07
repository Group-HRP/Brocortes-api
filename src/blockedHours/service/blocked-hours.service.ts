import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateBlockedHoursDto } from '../DTO/create.blockedHours.dto';
import { BlockedHoursFilterDto } from '../DTO/filter.blockedHours.dto';

@Injectable()
export class BlockedHoursService {
  constructor(private prisma: PrismaClient) {}

  async createBlockedHours(createBlockedHours: CreateBlockedHoursDto) {
    if (!createBlockedHours.date || !createBlockedHours.reason) {
      throw new BadRequestException('Data e motivo são obrigatórios');
    }

    const blockedHours = await this.prisma.blockedHours.create({
      data: {
        date: createBlockedHours.date,
        reason: createBlockedHours.reason,
      },
    });

    return blockedHours;
  }

  async getBlockedHours(filters: BlockedHoursFilterDto) {
    const where: any = {};

    if (filters.date) {
      where['date'] = {
        equals: new Date(filters.date),
      };
    }

    if (filters.date && filters.endDate) {
      where['date'] = {
        gte: new Date(filters.date),
        lte: new Date(filters.endDate),
      };
    } else if (filters.endDate) {
      where['date'] = {
        lte: new Date(filters.endDate),
      };
    }

    if (filters.reason) {
      where['reason'] = {
        contains: filters.reason,
        mode: 'insensitive',
      };
    }

    const blockedHours = await this.prisma.blockedHours.findMany({
      where,
      orderBy: {
        date: 'asc',
      },
      select: {
        id: true,
        date: true,
        reason: true,
        createdAt: true,
      },
    });

    if (blockedHours.length === 0) {
      throw new NotFoundException(
        'Nenhum horário bloqueado encontrado com os filtros fornecidos',
      );
    }

    return blockedHours;
  }

  async deleteBlockedHours(id: number) {
    const blockedHoursId = await this.prisma.blockedHours.findUnique({
      where: { id },
    });

    if (!blockedHoursId) {
      throw new NotFoundException('Horário bloqueado não encontrado');
    }

    const blockedHours = await this.prisma.blockedHours.delete({
      where: {
        id,
      },
    });

    return blockedHours;
  }
}
