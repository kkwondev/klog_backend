import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

const fromAuthHeader = () => {
  return (request: Request) => {
    let token = null;
    if (request && request.headers) {
      const authHeaders: string = request.headers['authorization'];
      if (authHeaders && authHeaders.split(' ')[1]) {
        token = authHeaders.split(' ')[1];
      }
    }
    return token;
  };
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: fromAuthHeader(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }

  async validate({
    loginId,
    userId,
    nickname,
  }: {
    loginId: string;
    userId: number;
    nickname: string;
  }) {
    return { loginId, userId, nickname };
  }
}
