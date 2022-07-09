import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JoinRequestDto } from './dtos/join.request.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post('join')
  async create(@Body() { loginId, password, nickname }: JoinRequestDto) {
    const user = await this.userService.join(loginId, password, nickname);

    if (user) {
      return { message: 'success' };
    } else {
      throw new ForbiddenException();
    }
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  me(@Req() req) {
    return { data: req.user };
  }
}
