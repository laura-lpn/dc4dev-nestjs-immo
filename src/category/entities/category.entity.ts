import { AdvertEntity } from 'src/advert/entities/advert.entity';
import { TimestampEntity } from 'src/generic/timestamp.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class CategoryEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => AdvertEntity, (advert) => advert.category)
  posts: AdvertEntity[];
}
