import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdvertService } from './advert.service';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';
import { QueriesAdvertDTO } from './dto/queries-advert.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/auth/decorator/user.decorator';

@Controller('adverts')
export class AdvertController {
  constructor(private readonly advertService: AdvertService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createAdvertDto: CreateAdvertDto, @User() user) {
    return this.advertService.create(createAdvertDto, user);
  }

  @Get()
  findAll(@Query() queries: QueriesAdvertDTO) {
    return this.advertService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advertService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateAdvertDto: UpdateAdvertDto,
    @User() user,
  ) {
    return this.advertService.update(+id, updateAdvertDto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @User() user) {
    return this.advertService.remove(+id, user);
  }
}
