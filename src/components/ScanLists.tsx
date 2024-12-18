import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllScans, deleteScanById } from "../api/apiService";
import Loading from "./Loading";

interface Scan {
  id: string;
  name: string;
  status: string;
}

const ScanLists: React.FC = () => {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null); // ID tombol yang sedang diproses
  const [error, setError] = useState<string | null>(null); // Menyimpan error
  const navigate = useNavigate();

  // Fungsi untuk mengambil data scan dari backend
  const fetchScans = async () => {
    try {
      const data = await getAllScans();
      setScans(data);
    } catch (err) {
      setError("Failed to fetch scans. Please try again later.");
      console.error("Error fetching scans:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menghapus scan berdasarkan ID
  const handleDelete = async (id: string) => {
    setDeletingId(id); // Tampilkan loader di tombol yang dipilih
    try {
      await deleteScanById(id);
      setScans(scans.filter((scan) => scan.id !== id)); // Perbarui daftar
    } catch (err) {
      setError("Failed to delete scan. Please try again.");
      console.error("Error deleting scan:", err);
    } finally {
      setDeletingId(null); // Reset state tombol
    }
  };

  // Ambil data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchScans();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="table-container">
      <div className="table-card">
        <h1>Scan Lists</h1>
        <table>
          <thead>
            <tr>
              <th style={{ width: "5%" }}>No</th>
              <th>Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {scans.length > 0 ? (
              scans.map((scan, index) => (
                <tr key={scan.id}>
                  <td>{index + 1}</td>
                  <td>{scan.name}</td>
                  <td>{scan.status}</td>
                  <td>
                    <button
                      className="view-button"
                      onClick={() => navigate(`/scan/${scan.id}`)}
                    >
                      View
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(scan.id)}
                      disabled={deletingId === scan.id} // Disable jika tombol ini sedang diproses
                    >
                      {deletingId === scan.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  No scans found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScanLists;
