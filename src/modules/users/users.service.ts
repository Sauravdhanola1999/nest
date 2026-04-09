// users.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

type UserResponse = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async findOne(id: number): Promise<UserResponse> {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.toUserResponse(user);
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    const existingUser = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const user = this.userRepo.create(createUserDto);
    const savedUser = await this.userRepo.save(user);
    return this.toUserResponse(savedUser);
  }

  async findAll(): Promise<UserResponse[]> {
    const users = await this.userRepo.find();
    return users.map((user) => this.toUserResponse(user));
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponse> {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepo.findOne({
        where: { email: updateUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    }

    const updatedUser = this.userRepo.merge(user, updateUserDto);
    const savedUser = await this.userRepo.save(updatedUser);
    return this.toUserResponse(savedUser);
  }

  private toUserResponse(user: User): UserResponse {
    const { password, ...safeUser } = user;
    return safeUser;
  }
}
