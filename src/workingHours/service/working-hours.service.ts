import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWorkingHourDto } from '../DTO/create-working-hour.dto';
import { UpdateWorkingHourDto } from '../DTO/update-working-hour.dto';
import { PrismaClient } from '@prisma/client';
import { format, parse, isBefore, addMinutes } from 'date-fns';

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

  async getAvailableTimes(date: string, serviceId: number) {
    const parsedDate = new Date(date);

    if (!parsedDate || isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Data inválida.');
    }

    const dayOfWeek = parsedDate
      .toLocaleDateString('en-US', { weekday: 'long' })
      .toLocaleLowerCase();

    const workingHour = await this.prisma.workingHours.findFirst({
      where: { dayOfWeek },
    });

    if (!workingHour || workingHour.isClosed) {
      return [];
    }

    const service = await this.prisma.service.findUnique({
      where: { id: Number(serviceId) },
    });

    if (!service) {
      throw new BadRequestException('Serviço não encontrado.');
    }

    const duration = service.duration;

    const oppeningTime = parse(
      `${date} ${workingHour.openingTime}`,
      'yyyy-MM-dd HH:mm',
      new Date(),
    );
    const closingTime = parse(
      `${date} ${workingHour.closingTime}`,
      'yyyy-MM-dd HH:mm',
      new Date(),
    );

    const appointments = await this.prisma.appointment.findMany({
      where: {
        date: {
          gte: oppeningTime,
          lt: closingTime,
        },
      },
      select: {
        date: true,
      },
    });

    const bookedSlots = appointments.map((app) => format(app.date, 'HH:mm'));

    const avaliableSlots: string[] = [];

    let currentSlot = oppeningTime;

    while (
      isBefore(addMinutes(currentSlot, duration), closingTime) ||
      +addMinutes(currentSlot, duration) === +closingTime
    ) {
      const slotFormatted = format(currentSlot, 'HH:mm');

      const isBooked = bookedSlots.includes(slotFormatted);
      if (!isBooked) {
        avaliableSlots.push(slotFormatted);
      }

      currentSlot = addMinutes(currentSlot, duration);
    }

    return avaliableSlots;
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
