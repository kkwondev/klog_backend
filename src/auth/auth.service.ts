import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginId: string, password: string) {
    const user = await this.usersService.getUserByLoginId(loginId);
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const { password, ...withOutPassword } = user;
        return withOutPassword;
      }
    }
    return null;
  }

  async login(loginId: string, password: string) {
    const validateUser = await this.validateUser(loginId, password);
    if (!validateUser) {
      throw new NotFoundException('아이디 비밀번호를 확인하세요.');
    }

    const payload = {
      nickname: validateUser.nickname,
      userId: validateUser.userId,
      loginId: validateUser.loginId,
    };

    const accessToken = this.jwtService.sign(payload);
    return { data: { accessToken, ...payload } };
  }
}
