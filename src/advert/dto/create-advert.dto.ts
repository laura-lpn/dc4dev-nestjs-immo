import { CategoryEntity } from 'src/category/entities/category.entity';

export class CreateAdvertDto {
  title: string;
  descriptionn: string;
  price: number;
  nb_rooms: number;
  category: CategoryEntity;
}
