import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDate()
  readonly dateStart: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDate()
  readonly dateEnd: Date;

  @IsString()
  @IsNotEmpty()
  readonly access: string;
  @IsString()
  @IsNotEmpty()
  readonly invited: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly user_email: string;
}
