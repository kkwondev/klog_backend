import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entites/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async join(loginId: string, password: string, nickname: string) {
    try {
      const isLoginId = await this.usersRepository.findOne({
        where: { loginId },
      });
      if (isLoginId) {
        throw new ForbiddenException(`${loginId} 이미 존재하는 아이디입니다.`);
      }

      const hashPassword = await bcrypt.hash(password, 12);

      return await this.usersRepository.save({
        loginId,
        password: hashPassword,
        nickname,
      });
    } catch (e) {
      throw e;
    }
  }
}
