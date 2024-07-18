import { ApiProperty } from '@nestjs/swagger';

export class CreateTransaksiDto {
  @ApiProperty({
    example: '1',
  })
  id_barang: number;

  @ApiProperty({
    example: '1',
  })
  jumlah_terjual: number;
}
