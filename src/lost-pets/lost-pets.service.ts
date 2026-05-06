import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LostPetEntity } from './entities/lost-pet.entity';
import { CacheService } from '../cache/cache.service';
import { logger } from '../config/logger';

const CACHE_KEY_LOST_PETS = 'lost_pets_active';

@Injectable()
export class LostPetsService {
  constructor(
    @InjectRepository(LostPetEntity)
    private readonly lostPetRepository: Repository<LostPetEntity>,
    private readonly cacheService: CacheService,
  ) {}

  async findAllActive() {
    try {
      const cached = await this.cacheService.get<LostPetEntity[]>(CACHE_KEY_LOST_PETS);
      if (cached && cached.length > 0) {
        logger.info('[LostPetsService] Retornando mascotas perdidas activas desde el CACHÉ (Redis)');
        return cached;
      }

      const activePets = await this.lostPetRepository.find({ where: { is_active: true } });
      logger.info('[LostPetsService] Retornando mascotas perdidas activas desde la BASE DE DATOS');
      
      this.cacheService.set(CACHE_KEY_LOST_PETS, activePets);
      return activePets;
    } catch (error) {
      logger.error(`[LostPetsService] Error al obtener mascotas perdidas: ${error}`);
      return [];
    }
  }

  async create(createDto: { title: string; description: string; lat: number; lon: number }) {
    await this.lostPetRepository
      .createQueryBuilder()
      .insert()
      .into(LostPetEntity)
      .values({
        title: createDto.title,
        description: createDto.description,
        lat: createDto.lat,
        lon: createDto.lon,
        is_active: true,
        location: () => `ST_SetSRID(ST_MakePoint(${createDto.lon}, ${createDto.lat}), 4326)::geography`,
      })
      .execute();

    await this.cacheService.del(CACHE_KEY_LOST_PETS);
    return { success: true };
  }
}
