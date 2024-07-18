import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransaksiDto } from './dto/create-transaksi.dto';
import { Transaksi } from './entities/transaksi.entity';
import { UpdateTransaksiDto } from './dto/update-transaksi.dto';
// import { CompareTransaksiDto } from './dto/compare-transaksi.dto';

@Injectable()
export class TransaksiService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTransaksiDto): Promise<Transaksi> {
    const barang = await this.prisma.barang.findUnique({
      where: { id: data.id_barang },
    });

    if (!barang) {
      throw new NotFoundException(`ID barang tidak ditemukan`);
    }

    return this.prisma.transaksi.create({
      data: {
        ...data,
        tanggal_transaksi: new Date(),
      },
    });
  }

  async findAll(): Promise<Transaksi[]> {
    return this.prisma.transaksi.findMany({
      include: { Barang: true },
    });
  }

  async findOne(id: number): Promise<Transaksi> {
    const transaksi = await this.prisma.transaksi.findUnique({
      where: { id },
      include: {
        Barang: true,
      },
    });

    if (!transaksi) {
      throw new NotFoundException(`Transaksi dengan ID ${id} tidak ditemukan`);
    }

    return transaksi;
  }

  async update(id: number, data: UpdateTransaksiDto): Promise<Transaksi> {
    return this.prisma.transaksi.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Transaksi> {
    const transaksi = await this.prisma.transaksi.findUnique({ where: { id } });

    if (!transaksi) {
      throw new NotFoundException(`ID transaksi tidak ditemukan`);
    }

    return this.prisma.transaksi.delete({ where: { id } });
  }

  async searchByDate(date: string): Promise<Transaksi[]> {
    const [day, month, year] = date.split('-').map(Number);
    const startDate = new Date(year, month - 1, day);
    const endDate = new Date(year, month - 1, day + 1);

    return this.prisma.transaksi.findMany({
      where: {
        tanggal_transaksi: {
          gte: startDate,
          lt: endDate,
        },
      },
      include: {
        Barang: true,
      },
    });
  }

  async getTransactions(sortOrder: 'tertinggi' | 'terendah' = 'tertinggi') {
    const orderBy = sortOrder === 'tertinggi' ? 'desc' : 'asc';

    return this.prisma.transaksi.findMany({
      orderBy: {
        jumlah_terjual: orderBy,
      },
      include: {
        Barang: {
          select: {
            jenis_barang: true,
          },
        },
      },
    });
  }
}
