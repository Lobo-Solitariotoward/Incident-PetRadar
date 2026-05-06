import { Controller, Get, Post, Body } from '@nestjs/common';
import { FoundPetsService } from './found-pets.service';

@Controller('found-pets')
export class FoundPetsController {
  constructor(private readonly foundPetsService: FoundPetsService) {}

  @Get()
  async getFoundPets() {
    return this.foundPetsService.findAll();
  }

  @Post()
  async createFoundPet(@Body() createDto: { title: string; description: string; lat: number; lon: number }) {
    return this.foundPetsService.create(createDto);
  }
}
