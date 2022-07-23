import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JoinRequestDto } from './dtos/join.request.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { responseError } from '../tools/reseponse-error.tools';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post('join')
  async create(@Body() { loginId, password, nickname }: JoinRequestDto) {
    try {
      const user = await this.userService.join(loginId, password, nickname);

      if (user) {
        return { message: 'SUCCESS', user };
      }
    } catch (e) {
      responseError(e);
    }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req) {
    return { message: 'SUCCESS', user: req.user };
  }
}
