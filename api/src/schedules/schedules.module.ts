import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';

@Module({
  controllers: [SchedulesController],
  providers: [SchedulesService, PrismaService],
})
export class SchedulesModule {}
