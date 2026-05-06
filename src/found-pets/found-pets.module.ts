import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoundPetsController } from './found-pets.controller';
import { FoundPetsService } from './found-pets.service';
import { FoundPetEntity } from './entities/found-pet.entity';
import { LostPetsModule } from '../lost-pets/lost-pets.module';
import { CacheModule } from '../cache/cache.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FoundPetEntity]),
    LostPetsModule,
    CacheModule,
    EmailModule,
  ],
  controllers: [FoundPetsController],
  providers: [FoundPetsService],
})
export class FoundPetsModule {}
