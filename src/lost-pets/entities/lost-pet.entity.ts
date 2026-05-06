import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('lost_pets')
export class LostPetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ default: true })
  is_active: boolean;

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
