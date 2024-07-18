import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBarangDto } from './dto/create-barang.dto';
import { UpdateBarangDto } from './dto/update-barang.dto';
import { Barang } from './entities/barang.entity';
import { SearchBarangDto } from './dto/search-barang.dto';

@Injectable()
export class BarangService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBarangDto): Promise<Barang> {
    return this.prisma.barang.create({ data });
  }

  async findAll(): Promise<Barang[]> {
    return this.prisma.barang.findMany();
  }

  async findOne(id: number): Promise<Barang> {
    const barang = await this.prisma.barang.findUnique({
      where: { id: id },
    });

    if (!barang) {
      throw new NotFoundException(`Barang dengan ID ${id} tidak ditemukan`);
    }

    return barang;
  }

  async update(id: number, data: UpdateBarangDto): Promise<Barang> {
    const barang = await this.prisma.barang.findUnique({ where: { id } });

    if (!barang) {
      throw new NotFoundException(`Barang with ID ${id} not found`);
    }

    return this.prisma.barang.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Barang> {
    const barang = await this.prisma.barang.findUnique({ where: { id } });

    if (!barang) {
      throw new NotFoundException(`Barang dengan ID ${id} tidak ditemukan`);
    }

    return this.prisma.barang.delete({
      where: { id },
    });
  }

  async searchBarang(searchBarangDto: SearchBarangDto): Promise<Barang[]> {
    const { nama_barang } = searchBarangDto;

    return this.prisma.barang.findMany({
      where: {
        nama_barang: {
          contains: nama_barang,
          mode: 'insensitive',
        },
      },
      orderBy: {
        nama_barang: 'asc',
      },
    });
  }
}
