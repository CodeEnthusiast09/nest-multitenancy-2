import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTenantDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(5)
  name: string;
}
