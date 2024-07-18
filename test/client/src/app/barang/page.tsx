"use client"

import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import useFetch from "@/hooks/fetcher";
import BarangModal from "@/components/BarangModal";
import { useState, useEffect } from "react";

interface Barang {
  id: number;
  nama_barang: string;
  jenis_barang: string;
  stok: number;
}

export default function BarangPage() {
  const { data: barang, error, loading, fetchData } = useFetch<Barang[]>("/barang");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBarang, setSelectedBarang] = useState<Barang | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData("get");
  }, [fetchData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleOpenModal = (barang?: Barang) => {
    setSelectedBarang(barang);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBarang(undefined);
    setIsModalOpen(false);
  };

  const handleSubmit = async (formData: Omit<Barang, "id">) => {
    if (selectedBarang) {
      await fetchData("patch", { ...selectedBarang, ...formData }, `/barang/${selectedBarang.id}`);
    } else {
      await fetchData("post", formData);
    }
    fetchData("get"); 
    handleCloseModal();
  };

  const handleDelete = async (id: number) => {
    await fetchData("delete", undefined, `/barang/${id}`);
    fetchData("get"); 
  };

  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      const result = await fetchData("get", undefined, `/barang/search?nama_barang=${searchTerm}`);
      setSearchTerm("");
    } else {
      fetchData("get");
    }
  };

  return (
    <div className='p-4'>
      <div className="flex justify-between">
        <h1 className='text-2xl font-bold mb-4'>Daftar Barang</h1>
        <button onClick={() => handleOpenModal()} className='flex mb-4 items-center bg-blue-500 gap-1 p-2 rounded-md text-white mb-4'>
          <FaPlus /> Tambah Barang
        </button>
      </div>

      <div className="flex mb-4 items-center">
        <input
          type="text"
          placeholder="Cari barang berdasarkan nama"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='border border-gray-300 rounded-l-md px-2 py-1'
        />
        <button onClick={handleSearch} className='bg-blue-500 text-white px-3 py-1 rounded-r-md'>
          Cari
        </button>
      </div>

      <table className='min-w-full bg-white border'>
        <thead className='bg-gray-200'>
          <tr>
            <th className='border border-gray-300 px-4 py-2'>ID</th>
            <th className='border border-gray-300 px-4 py-2'>Nama Barang</th>
            <th className='border border-gray-300 px-4 py-2'>Jenis Barang</th>
            <th className='border border-gray-300 px-4 py-2'>Stok</th>
            <th className='border border-gray-300 px-4 py-2'>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {barang?.map((item) => (
            <tr key={item.id}>
              <td className='border border-gray-300 px-4 py-2'>{item.id}</td>
              <td className='border border-gray-300 px-4 py-2'>{item.nama_barang}</td>
              <td className='border border-gray-300 px-4 py-2'>{item.jenis_barang}</td>
              <td className='border border-gray-300 px-4 py-2'>{item.stok}</td>
              <td className='border border-gray-300 px-4 py-2 flex gap-2 justify-center'>
                <button onClick={() => handleOpenModal(item)} className='text-blue-600 hover:bg-blue-200 p-1 rounded'>
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(item.id)} className='text-red-600 hover:bg-red-200 p-1 rounded'>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && <BarangModal isOpen={isModalOpen} onClose={handleCloseModal} barang={selectedBarang} onSubmit={handleSubmit} />}
    </div>
  );
}
