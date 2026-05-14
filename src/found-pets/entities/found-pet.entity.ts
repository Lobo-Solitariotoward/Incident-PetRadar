import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('found_pets')
export class FoundPetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  species: string;

  @Column({ nullable: true })
  breed: string;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  finder_name: string;

  @Column({ nullable: true })
  finder_email: string;

  @Column({ nullable: true })
  finder_phone: string;

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
