import React, { useState, useEffect } from 'react';

interface TransaksiModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaksi?: {
    id: number;
    id_barang: number;
    jumlah_terjual: number;
  } | null;
  onSubmit: (data: { id_barang: number; jumlah_terjual: number }) => void;
}

const TransaksiModal: React.FC<TransaksiModalProps> = ({ isOpen, onClose, transaksi, onSubmit }) => {
  const [formData, setFormData] = useState({ id_barang: 0, jumlah_terjual: 0 });

  useEffect(() => {
    if (transaksi) {
      setFormData({
        id_barang: transaksi.id_barang,
        jumlah_terjual: transaksi.jumlah_terjual
      });
    } else {
      setFormData({ id_barang: 0, jumlah_terjual: 0 });
    }
  }, [transaksi]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50   flex items-center justify-center">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <h2 className="text-2xl mb-4">{transaksi ? 'Edit Transaksi' : 'Tambah Transaksi'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">ID Barang</label>
            <input
              type="number"
              name="id_barang"
              value={formData.id_barang}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Jumlah Terjual</label>
            <input
              type="number"
              name="jumlah_terjual"
              value={formData.jumlah_terjual}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Batal
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransaksiModal;
