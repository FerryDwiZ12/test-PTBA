import { ApiProperty } from '@nestjs/swagger';

export class UpdateTransaksiDto {
  @ApiProperty({
    example: '1',
    description: 'Id barang yang tersedia',
  })
  id_barang?: number;

  @ApiProperty({
    example: '1',
    description: 'Banyak barang yang terjual',
  })
  jumlah_terjual?: number;
}
