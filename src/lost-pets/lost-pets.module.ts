import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LostPetsController } from './lost-pets.controller';
import { LostPetsService } from './lost-pets.service';
import { LostPetEntity } from './entities/lost-pet.entity';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([LostPetEntity]), CacheModule],
  controllers: [LostPetsController],
  providers: [LostPetsService],
  exports: [TypeOrmModule]
})
export class LostPetsModule {}
