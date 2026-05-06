import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('found_pets')
export class FoundPetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('float')
  lat: number;

  @Column('float')
  lon: number;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: string;
}
