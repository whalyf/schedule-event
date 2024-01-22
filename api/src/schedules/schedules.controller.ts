import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { SchedulesService } from './schedules.service';

@ApiTags('schedules')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  async create(
    @Body() createScheduleDto: CreateScheduleDto,
    @Headers('user-email') user_email: CreateScheduleDto['user_email'],
    @Res() res: Response,
  ) {
    const verifiedDate = await this.schedulesService.verifyDate(
      createScheduleDto.dateStart,
      createScheduleDto.dateEnd,
      user_email,
    );

    if (typeof verifiedDate === 'boolean') {
      const response = await this.schedulesService.create({
        ...createScheduleDto,
        user_email,
      });
      return res.status(HttpStatus.CREATED).json({ message: response });
    }
    return res.status(HttpStatus.FORBIDDEN).json({ message: verifiedDate });
  }

  @Get()
  async findAllByUser(
    @Headers('user-email') user_email: CreateScheduleDto['user_email'],
  ) {
    return await this.schedulesService.findAllByUser(user_email);
  }

  @Get('events')
  async findAll() {
    return this.schedulesService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Headers('user-email') user_email: CreateScheduleDto['user_email'],
    @Body() updateScheduleDto: UpdateScheduleDto,
    @Res() res: Response,
  ) {
    const scheduleExists = await this.schedulesService.findOne({
      id,
      user_email,
    });

    if (!!scheduleExists) {
      const response = await this.schedulesService.update(
        id,
        updateScheduleDto,
      );

      return res.status(HttpStatus.CREATED).json({ message: response });
    }

    return res.status(HttpStatus.FORBIDDEN).json({
      message: `Esse evento não existe ou você não é o criador do mesmo`,
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Headers('user-email') user_email: CreateScheduleDto['user_email'],
    @Res() res: Response,
  ) {
    const scheduleExists = await this.schedulesService.findOne({
      id,
      user_email,
    });

    if (!!scheduleExists) {
      const response = await this.schedulesService.delete(id);

      return res.status(HttpStatus.OK).json({ message: response });
    }

    return res.status(HttpStatus.FORBIDDEN).json({
      message: `Esse evento não existe ou você não é o responsável pelo mesmo`,
    });
  }
}
