import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { JoinRequestDto } from './dtos/join.request.dto';
import { UsersService } from './users.service';

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
}
