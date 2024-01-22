import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchedulesModule } from './schedules/schedules.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, SchedulesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
