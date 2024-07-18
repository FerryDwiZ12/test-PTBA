import { ApiProperty } from '@nestjs/swagger';

export class UpdateBarangDto {
  @ApiProperty()
  nama_barang?: string;

  @ApiProperty()
  stok: number;

  @ApiProperty()
  jenis_barang?: string;
}
