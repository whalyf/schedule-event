import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ISchedule } from './interfaces/schedule.interface';

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}

  async create(createScheduleDto: CreateScheduleDto) {
    await this.prisma.schedule.create({ data: createScheduleDto });
    return `Evento agendado para ${new Date(createScheduleDto.dateStart).toLocaleDateString('pt-BR')}`;
  }

  async findAllByUser(
    user_email: CreateScheduleDto['user_email'],
  ): Promise<ISchedule[]> {
    return await this.prisma.schedule.findMany({
      where: {
        user_email,
      },
    });
  }

  async findAll(): Promise<ISchedule[]> {
    return await this.prisma.schedule.findMany();
  }

  async verifyDate(
    dateStart: ISchedule['dateStart'],
    dateEnd: ISchedule['dateEnd'],
    user_email: ISchedule['user_email'],
  ) {
    const today = new Date();

    if (new Date(dateStart) > new Date(dateEnd)) {
      return `A data inicial precisa ser anterior a data final`;
    }

    if (new Date(dateStart) < today) {
      return `Não é possível agendar em uma data passada`;
    }

    const dateBusy = await this.prisma.schedule.findFirst({
      where: {
        user_email,
        dateStart,
      },
    });

    if (dateBusy) {
      return `Já existe um agendamento para a data ${new Date(dateStart).toLocaleDateString('pt-BR')}`;
    }

    return true;
  }

  async findOne({
    id,
    user_email,
  }: {
    id: ISchedule['id'];
    user_email: CreateScheduleDto['user_email'];
  }): Promise<ISchedule> {
    return await this.prisma.schedule.findFirst({ where: { id, user_email } });
  }

  async update(
    id: UpdateScheduleDto['id'],
    updateScheduleDto: Omit<UpdateScheduleDto, 'user_email' | 'id'>,
  ) {
    await this.prisma.schedule.update({
      where: { id },
      data: updateScheduleDto,
    });
    return `Evento atualizado`;
  }

  async delete(id: string) {
    await this.prisma.schedule.delete({ where: { id } });
    return `Evento deletado com sucesso`;
  }
}
