import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LostPetsService } from './lost-pets.service';
import { CreateLostPetDto } from './dto/create-lost-pet.dto';

@ApiTags('Lost Pets')
@Controller('lost-pets')
export class LostPetsController {
  constructor(private readonly lostPetsService: LostPetsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las mascotas perdidas activas' })
  @ApiResponse({ status: 200, description: 'Lista de mascotas perdidas' })
  async getActiveLostPets() {
    return this.lostPetsService.findAllActive();
  }

  @Post()
  @ApiOperation({ summary: 'Reportar una mascota perdida' })
  @ApiResponse({ status: 201, description: 'Mascota reportada exitosamente' })
  async createLostPet(@Body() createDto: CreateLostPetDto) {
    return this.lostPetsService.create(createDto);
  }
}
