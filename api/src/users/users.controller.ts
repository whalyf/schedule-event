import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const userAlreadyExists = await this.usersService.findOne(
      createUserDto.email,
    );

    if (!userAlreadyExists) {
      await this.usersService.create(createUserDto);
      return res.status(HttpStatus.CREATED).json({ message: 'User Created' });
    }
    return res
      .status(HttpStatus.CONFLICT)
      .json({ message: 'User already exists' });
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':email')
  async findOne(
    @Param('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    const result = await this.usersService.findOne(email, password);

    if (!result) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'No user found' });
    }

    return res.json(result);
  }
}
