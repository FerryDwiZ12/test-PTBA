-- CreateTable
CREATE TABLE "Barang" (
    "id" SERIAL NOT NULL,
    "nama_barang" TEXT NOT NULL,
    "stok" INTEGER NOT NULL,
    "jenis_barang" TEXT NOT NULL,

    CONSTRAINT "Barang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaksi" (
    "id" SERIAL NOT NULL,
    "id_barang" INTEGER NOT NULL,
    "jumlah_terjual" INTEGER NOT NULL,
    "tanggal_transaksi" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_id_barang_fkey" FOREIGN KEY ("id_barang") REFERENCES "Barang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
