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
  async createFoundPet(@Body() createDto: {
    title: string;
    description: string;
    lat: number;
    lon: number;
    species?: string;
    breed?: string;
    color?: string;
    finder_name?: string;
    finder_email?: string;
    finder_phone?: string;
  }) {
    return this.foundPetsService.create(createDto);
  }
}
