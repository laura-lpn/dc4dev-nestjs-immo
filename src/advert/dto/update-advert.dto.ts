import { PartialType } from '@nestjs/mapped-types';
import { CreateAdvertDto } from './create-advert.dto';

export class UpdateAdvertDto extends PartialType(CreateAdvertDto) {
  title?: string;
  description?: string;
  price?: number;
  nb_rooms?: number;
  category_id?: number;
}
