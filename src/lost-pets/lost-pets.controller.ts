import { Controller, Get, Post, Body } from '@nestjs/common';
import { LostPetsService } from './lost-pets.service';

@Controller('lost-pets')
export class LostPetsController {
  constructor(private readonly lostPetsService: LostPetsService) {}

  @Get()
  async getActiveLostPets() {
    return this.lostPetsService.findAllActive();
  }

  @Post()
  async createLostPet(@Body() createDto: {
    title: string;
    description: string;
    lat: number;
    lon: number;
    species?: string;
    breed?: string;
    color?: string;
  }) {
    return this.lostPetsService.create(createDto);
  }
}
