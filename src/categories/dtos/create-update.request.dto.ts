import { IsString } from 'class-validator';

export class CreateAndUpdateRequestDto {
  @IsString()
  name: string;
}
