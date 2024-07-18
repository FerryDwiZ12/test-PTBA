import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BarangService } from './barang.service';
import { CreateBarangDto } from './dto/create-barang.dto';
import { UpdateBarangDto } from './dto/update-barang.dto';
import { Barang } from './entities/barang.entity';
import { ApiTags } from '@nestjs/swagger';
import { SearchBarangDto } from './dto/search-barang.dto';

@ApiTags('Barang')
@Controller('barang')
export class BarangController {
  constructor(private readonly barangService: BarangService) {}

  @Post()
  create(@Body() createBarangDto: CreateBarangDto): Promise<Barang> {
    return this.barangService.create(createBarangDto);
  }

  @Get()
  findAll(): Promise<Barang[]> {
    return this.barangService.findAll();
  }

  @Get('search')
  async search(@Query() searchBarangDto: SearchBarangDto): Promise<Barang[]> {
    return this.barangService.searchBarang(searchBarangDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Barang> {
    return this.barangService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBarangDto: UpdateBarangDto,
  ): Promise<Barang> {
    return this.barangService.update(+id, updateBarangDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Barang> {
    return this.barangService.remove(+id);
  }
}
