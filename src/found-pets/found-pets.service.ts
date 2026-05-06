import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoundPetEntity } from './entities/found-pet.entity';
import { LostPetEntity } from '../lost-pets/entities/lost-pet.entity';
import { CacheService } from '../cache/cache.service';
import { EmailService } from '../email/email.service';
import { generateMapBoxStaticImage } from '../utils/mapbox.util';
import { envs } from '../config/envs';
import { logger } from '../config/logger';

const CACHE_KEY_FOUND_PETS = 'found_pets';

@Injectable()
export class FoundPetsService {
  constructor(
    @InjectRepository(FoundPetEntity)
    private readonly foundPetRepository: Repository<FoundPetEntity>,
    @InjectRepository(LostPetEntity)
    private readonly lostPetRepository: Repository<LostPetEntity>,
    private readonly cacheService: CacheService,
    private readonly emailService: EmailService,
  ) {}

  async findAll() {
    try {
      const cached = await this.cacheService.get<FoundPetEntity[]>(CACHE_KEY_FOUND_PETS);
      if (cached && cached.length > 0) {
        logger.info('[FoundPetsService] Retornando mascotas encontradas desde el CACHÉ (Redis)');
        return cached;
      }

      const foundPets = await this.foundPetRepository.find();
      logger.info('[FoundPetsService] Retornando mascotas encontradas desde la BASE DE DATOS');
      
      this.cacheService.set(CACHE_KEY_FOUND_PETS, foundPets);
      return foundPets;
    } catch (error) {
      logger.error(`[FoundPetsService] Error al obtener mascotas encontradas: ${error}`);
      return [];
    }
  }

  async create(createDto: { title: string; description: string; lat: number; lon: number }) {
    // 1. Save new found pet
    await this.foundPetRepository
      .createQueryBuilder()
      .insert()
      .into(FoundPetEntity)
      .values({
        title: createDto.title,
        description: createDto.description,
        lat: createDto.lat,
        lon: createDto.lon,
        location: () => `ST_SetSRID(ST_MakePoint(${createDto.lon}, ${createDto.lat}), 4326)::geography`,
      })
      .execute();

    // 2. Búsqueda por Radio (ST_DWithin): Buscar mascotas perdidas a 500m
    const radius = 500;
    const nearbyLostPets = await this.lostPetRepository
      .createQueryBuilder('lost_pet')
      // Condición 1: Solo mascotas que sigan perdidas (activas)
      .where('lost_pet.is_active = :isActive', { isActive: true })
      // Condición 2: Que estén a menos de 500 metros
      // ST_MakePoint crea el punto geográfico de la mascota encontrada
      // ST_DWithin calcula si la distancia entre los dos puntos es menor a 'radius' (500)
      // El cast a ::geography es para que PostGIS mida la distancia en metros reales y no en grados
      .andWhere(
        `ST_DWithin(
          lost_pet.location::geography,
          ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)::geography,
          :radius
        )`
      )
      .setParameters({ lon: createDto.lon, lat: createDto.lat, radius })
      .getMany();

    logger.info(`¡Match! Se encontraron ${nearbyLostPets.length} mascotas perdidas activas cerca (a menos de 500m).`);

    // 3. Send email if nearby pets are found
    if (nearbyLostPets.length > 0) {
      // Tomamos el primero de ejemplo para el mapa
      const closestLostPet = nearbyLostPets[0];
      const mapUrl = generateMapBoxStaticImage(
        closestLostPet.lat,
        closestLostPet.lon,
        createDto.lat,
        createDto.lon
      );

      // Llamamos a tu método sendMatchNotification pasándole los datos de la mascota encontrada
      await this.emailService.sendMatchNotification(createDto, mapUrl);
    }

    // 4. Clear found pets cache
    await this.cacheService.del(CACHE_KEY_FOUND_PETS);

    return { 
      success: true, 
      nearbyLostPets 
    };
  }
}
