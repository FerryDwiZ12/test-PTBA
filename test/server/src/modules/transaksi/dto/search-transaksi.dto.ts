import { ApiProperty } from '@nestjs/swagger';

export class SearchTransaksiDateDto {
  @ApiProperty({
    example: '17-07-2024',
    description: 'Tanggal dalam format DD-MM-YYYY',
  })
  date: string;
}
