import React, { useState, useEffect } from 'react';

interface Barang {
  id: number;
  nama_barang: string;
  jenis_barang: string;
  stok: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  barang?: Barang;
  onSubmit: (formData: Omit<Barang, 'id'>) => void;
}

const BarangModal: React.FC<ModalProps> = ({ isOpen, onClose, barang, onSubmit }) => {
  const [formData, setFormData] = useState({
    nama_barang: '',
    jenis_barang: '',
    stok: 0
  });

  useEffect(() => {
    if (barang) {
      setFormData({
        nama_barang: barang.nama_barang,
        jenis_barang: barang.jenis_barang,
        stok: barang.stok
      });
    } else {
      setFormData({
        nama_barang: '',
        jenis_barang: '',
        stok: 0
      });
    }
  }, [barang]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'stok' ? parseInt(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white  w-[450px] p-10 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{barang ? 'Edit Barang' : 'Tambah Barang'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nama Barang</label>
            <input
              type="text"
              name="nama_barang"
              value={formData.nama_barang}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Jenis Barang</label>
            <input
              type="text"
              name="jenis_barang"
              value={formData.jenis_barang}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Stok</label>
            <input
              type="number"
              name="stok"
              value={formData.stok}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 p-2 bg-gray-500 text-white rounded">
              Batal
            </button>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BarangModal;
