import { IsString } from 'class-validator';

export class JoinRequestDto {
  @IsString()
  loginId: string;

  @IsString()
  password: string;

  @IsString()
  nickname: string;
}
