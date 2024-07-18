import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TransaksiService } from './transaksi.service';
import { CreateTransaksiDto } from './dto/create-transaksi.dto';
import { Transaksi } from './entities/transaksi.entity';
import { UpdateTransaksiDto } from './dto/update-transaksi.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchTransaksiDateDto } from './dto/search-transaksi.dto';

@ApiTags('Transaksi')
@Controller('transaksi')
export class TransaksiController {
  constructor(private readonly transaksiService: TransaksiService) {}

  @Post()
  create(@Body() createTransaksiDto: CreateTransaksiDto): Promise<Transaksi> {
    return this.transaksiService.create(createTransaksiDto);
  }

  @Get()
  findAll(): Promise<Transaksi[]> {
    return this.transaksiService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Cari transaksi berdasarkan tanggal tanggal' })
  async searchByDate(@Query() searchDto: SearchTransaksiDateDto) {
    return this.transaksiService.searchByDate(searchDto.date);
  }

  @Get('trans')
  async getTransactions(@Query('sort') sortOrder: 'tertinggi' | 'terendah') {
    return this.transaksiService.getTransactions(sortOrder);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Transaksi> {
    return this.transaksiService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransaksiDto: UpdateTransaksiDto,
  ): Promise<Transaksi> {
    return this.transaksiService.update(+id, updateTransaksiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Transaksi> {
    return this.transaksiService.remove(+id);
  }
}
