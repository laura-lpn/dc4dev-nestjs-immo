import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  create(createUserDto: CreateUserDto) {
    try {
      return this.userRepository.save(createUserDto);
    } catch (error) {
      throw new ConflictException('Error creating user');
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    const user = this.userRepository.findOneBy({ id });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
