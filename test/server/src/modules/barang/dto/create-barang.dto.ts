import { ApiProperty } from '@nestjs/swagger';

export class CreateBarangDto {
  @ApiProperty()
  nama_barang: string;

  @ApiProperty()
  stok: number;

  @ApiProperty()
  jenis_barang: string;
}
