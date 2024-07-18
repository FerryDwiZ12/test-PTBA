import { ApiProperty } from '@nestjs/swagger';

export class SearchBarangDto {
  @ApiProperty()
  nama_barang?: string;
}
