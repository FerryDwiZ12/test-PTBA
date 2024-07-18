import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BarangModule } from './modules/barang/barang.module';
import { TransaksiModule } from './modules/transaksi/transaksi.module';
import { TransaksiController } from './modules/transaksi/transaksi.controller';
import { TransaksiService } from './modules/transaksi/transaksi.service';
import { BarangService } from './modules/barang/barang.service';
import { BarangController } from './modules/barang/barang.controller';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [BarangModule, TransaksiModule, PrismaModule],
  controllers: [AppController, BarangController, TransaksiController],
  providers: [AppService, BarangService, TransaksiService],
})
export class AppModule {}
