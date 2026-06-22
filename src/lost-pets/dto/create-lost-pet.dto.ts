import { ApiProperty } from '@nestjs/swagger';

export class CreateLostPetDto {
  @ApiProperty({ example: 'Perro perdido - Labrador' })
  title: string;

  @ApiProperty({ example: 'Se perdió en la colonia Roma, responde al nombre de Max' })
  description: string;

  @ApiProperty({ example: 19.4269 })
  lat: number;

  @ApiProperty({ example: -99.1674 })
  lon: number;

  @ApiProperty({ example: 'perro', required: false })
  species?: string;

  @ApiProperty({ example: 'Labrador', required: false })
  breed?: string;

  @ApiProperty({ example: 'dorado', required: false })
  color?: string;
}
