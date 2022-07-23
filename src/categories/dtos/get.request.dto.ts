import { IsString } from 'class-validator';

export class GetRequestDto {
  @IsString()
  categoryId: number;
}
