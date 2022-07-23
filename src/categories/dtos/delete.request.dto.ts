import { IsNumber } from 'class-validator';

export class DeleteRequestDto {
  @IsNumber()
  categoryId: number;
}
