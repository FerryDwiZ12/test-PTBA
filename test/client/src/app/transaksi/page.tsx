"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import useFetch from "@/hooks/fetcher";
import TransaksiModal from "@/components/TransaksiModal";

interface Barang {
  nama_barang: string;
  jenis_barang: number;
  stok: number;
}

interface Transaksi {
  id: number;
  id_barang: number;
  Barang: Barang;
  jumlah_terjual: number;
  tanggal_transaksi: string;
}

export default function TransaksiPage() {
  const { data: transaksi, error, loading, fetchData } = useFetch<Transaksi[]>("/transaksi");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaksi, setSelectedTransaksi] = useState<Transaksi | null>(null);
  const [searchDate, setSearchDate] = useState("");
  const [filteredTransaksi, setFilteredTransaksi] = useState<Transaksi[]>([]);

  useEffect(() => {
    fetchData("get");
  }, [fetchData]);

  useEffect(() => {
    setFilteredTransaksi(transaksi || []);
  }, [transaksi]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const formatDate = (isoDate: string) => {
    return format(new Date(isoDate), "dd-MM-yyyy");
  };

  const handleOpenModal = (transaksi?: Transaksi) => {
    setSelectedTransaksi(transaksi || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTransaksi(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (formData: { id_barang: number; jumlah_terjual: number }) => {
    if (selectedTransaksi) {
      await fetchData("patch", formData, `/transaksi/${selectedTransaksi.id}`);
    } else {
      await fetchData("post", formData, "/transaksi");
    }
    fetchData("get");
    handleCloseModal();
  };

  const handleDelete = async (id: number) => {
    await fetchData("delete", undefined, `/transaksi/${id}`);
    fetchData("get");
  };

  const handleSearch = async () => {
    if (searchDate) {
      console.log("Search date:", searchDate);
      const result = await fetchData("get", undefined, `/transaksi/search?date=${searchDate}`);
      setFilteredTransaksi(result || []);
    } else {
      setFilteredTransaksi(transaksi || []);
    }
  };

  return (
    <div className='p-4'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-bold'>Daftar Transaksi</h1>
        <div className='flex items-center space-x-4'>
          <div className='flex items-center'>
            <input type='text' placeholder='dd-MM-yyyy' value={searchDate} onChange={(e) => setSearchDate(e.target.value)} className='border border-gray-300 rounded-l-md px-2 py-1' />
            <button onClick={handleSearch} className='bg-blue-500 p-2.5  text-white rounded-r-md'>
              <FaSearch />
            </button>
          </div>
          <button onClick={() => handleOpenModal()} className='flex items-center bg-blue-500 gap-1 p-2 rounded-md'>
            <FaPlus className='text-white' />
            <h1 className='text-white'>Tambah Transaksi</h1>
          </button>
        </div>
      </div>
      <table className='table-auto w-full border-collapse border border-gray-200'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='border border-gray-300 px-4 py-2'>ID</th>
            <th className='border border-gray-300 px-4 py-2'>Nama Barang</th>
            <th className='border border-gray-300 px-4 py-2'>Jenis Barang</th>
            <th className='border border-gray-300 px-4 py-2'>Stok</th>
            <th className='border border-gray-300 px-4 py-2'>Jumlah Terjual</th>
            <th className='border border-gray-300 px-4 py-2'>Tanggal Terjual</th>
            <th className='border border-gray-300 px-4 py-2'>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransaksi.map((item) => (
            <tr key={item.id} className='border border-gray-200 '>
              <td className='border border-gray-300 px-4 py-2'>{item.id}</td>
              <td className='border border-gray-300 px-4 py-2'>{item.Barang?.nama_barang}</td>
              <td className='border border-gray-300 px-4 py-2'>{item.Barang?.jenis_barang}</td>
              <td className='border border-gray-300 px-4 py-2'>{item.Barang?.stok}</td>
              <td className='border border-gray-300 px-4 py-2'>{item.jumlah_terjual}</td>
              <td className='border border-gray-300 px-4 py-2'>{formatDate(item.tanggal_transaksi)}</td>
              <td className='border border-gray-300 px-4 py-2'>
                <div className='flex gap-2 justify-center'>
                  <button onClick={() => handleOpenModal(item)} className=' hover:bg-blue-200 text-blue-600 font-bold py-1 px-2 rounded'>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className=' hover:bg-red-200 text-red-600 font-bold py-1 px-2 rounded'>
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && <TransaksiModal isOpen={isModalOpen} onClose={handleCloseModal} transaksi={selectedTransaksi} onSubmit={handleSubmit} />}
    </div>
  );
}
