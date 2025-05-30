import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkingHourDto } from '../DTO/create-working-hour.dto';
import { UpdateWorkingHourDto } from '../DTO/update-working-hour.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class WorkingHoursService {
  constructor(private prisma: PrismaClient) {}

  async create(createWorkingHourDto: CreateWorkingHourDto) {
    const existingWorkingHour = await this.prisma.workingHours.findFirst({
      where: {
        dayOfWeek: createWorkingHourDto.dayOfWeek,
      },
    });

    if (existingWorkingHour) {
      throw new Error(
        `Working hour for ${createWorkingHourDto.dayOfWeek} already exists.`,
      );
    }

    const workingHour = await this.prisma.workingHours.create({
      data: createWorkingHourDto,
    });
    return workingHour;
  }

  async findAll() {
    return this.prisma.workingHours.findMany({
      orderBy: {
        dayOfWeek: 'asc',
      },
      select: {
        id: true,
        dayOfWeek: true,
        openingTime: true,
        closingTime: true,
      },
    });
  }

  async findOne(id: number) {
    const workingHour = await this.prisma.workingHours.findUnique({
      where: { id: id },
      select: {
        id: true,
        dayOfWeek: true,
        openingTime: true,
        closingTime: true,
      },
    });
    return workingHour;
  }

  async update(id: number, updateWorkingHourDto: UpdateWorkingHourDto) {
    const existingWorkingHour = await this.findOne(id);

    if (!existingWorkingHour) {
      throw new NotFoundException(
        `Horario de trabalho com ID ${id} não encontrado.`,
      );
    }

    const updatedWorkingHour = await this.prisma.workingHours.update({
      where: { id: id },
      data: updateWorkingHourDto,
    });

    return updatedWorkingHour;
  }

  async remove(id: number) {
    const existingWorkingHour = await this.findOne(id);
    if (!existingWorkingHour) {
      throw new NotFoundException(
        `Horario de trabalho com ID ${id} não encontrado.`,
      );
    }

    const deleteWorkingHour = await this.prisma.workingHours.delete({
      where: { id: id },
    });

    return deleteWorkingHour;
  }
}
