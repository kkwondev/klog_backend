import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  /**
   * 가입.
   * @param loginId
   * @param password
   * @param nickname
   */
  async join(loginId: string, password: string, nickname: string) {
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
  }

  /**
   * 로그인 아이디로 회원 찾기.
   * @param loginId
   */
  async getUserByLoginId(loginId: string) {
    const user = await this.usersRepository.findOne({
      where: { loginId },
      select: ['userId', 'loginId', 'password', 'nickname'],
    });
    if (!user) {
      throw new NotFoundException('없는 회원입니다.');
    }
    return user;
  }
}
