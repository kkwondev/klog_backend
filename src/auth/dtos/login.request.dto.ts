import { IsString } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  loginId: string;

  @IsString()
  password: string;
}
