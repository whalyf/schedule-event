import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    return await this.prisma.users.create({ data: createUserDto });
  }

  async findAll(): Promise<IUser[]> {
    return await this.prisma.users.findMany();
  }

  async findOne(email: string, password?: string) {
    return await this.prisma.users.findUnique({
      where: { password: password, email: email },
    });
  }
}
