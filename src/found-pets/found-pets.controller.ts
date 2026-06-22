import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FoundPetsService } from './found-pets.service';
import { CreateFoundPetDto } from './dto/create-found-pet.dto';

@ApiTags('Found Pets')
@Controller('found-pets')
export class FoundPetsController {
  constructor(private readonly foundPetsService: FoundPetsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las mascotas encontradas' })
  @ApiResponse({ status: 200, description: 'Lista de mascotas encontradas' })
  async getFoundPets() {
    return this.foundPetsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Reportar una mascota encontrada' })
  @ApiResponse({ status: 201, description: 'Mascota reportada exitosamente' })
  async createFoundPet(@Body() createDto: CreateFoundPetDto) {
    return this.foundPetsService.create(createDto);
  }
}
