import { ApiProperty } from '@nestjs/swagger';

export class CreateFoundPetDto {
  @ApiProperty({ example: 'Labrador encontrado' })
  title: string;

  @ApiProperty({ example: 'Encontramos un labrador dorado en la Roma Sur' })
  description: string;

  @ApiProperty({ example: 19.427 })
  lat: number;

  @ApiProperty({ example: -99.1675 })
  lon: number;

  @ApiProperty({ example: 'perro', required: false })
  species?: string;

  @ApiProperty({ example: 'Labrador', required: false })
  breed?: string;

  @ApiProperty({ example: 'dorado', required: false })
  color?: string;

  @ApiProperty({ example: 'Juan Pérez', required: false })
  finder_name?: string;

  @ApiProperty({ example: 'juan@email.com', required: false })
  finder_email?: string;

  @ApiProperty({ example: '555-1234', required: false })
  finder_phone?: string;
}
