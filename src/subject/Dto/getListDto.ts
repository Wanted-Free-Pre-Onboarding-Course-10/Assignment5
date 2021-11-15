import { IsNotEmpty } from 'class-validator';
export class GetListDto {
  @IsNotEmpty()
  limit: number;

  @IsNotEmpty()
  offset: number;
}
