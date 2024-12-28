import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllScans, deleteScanById } from "../api/apiService";
import Loading from "./Loading";
import Swal from "sweetalert2";

interface Scan {
  id: string;
  name: string;
  status: string;
}

const ScanLists: React.FC = () => {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<number | null>(null); 
  const navigate = useNavigate();

  // Fungsi untuk mengambil data scan dari backend
  const fetchScans = async () => {
    try {
      const data = await getAllScans();
      setScans(data);
      setError(null); 
      setErrorCode(null);
    } catch (err: any) {
      console.error("Error fetching scans:", err);
    
      const statusCode = err?.status || 500; 
      switch (statusCode) {
        case 401:
          setError("Uh-oh! We have unauthorized user here. How about we go home? :)");
          setErrorCode(401);
          break;
        case 404:
          setError("Uh-oh! Scans not found.");
          setErrorCode(404);
          break;
        default:
          setError("Uh-oh! An unexpected error occurred.");
          setErrorCode(statusCode);
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menghapus scan berdasarkan ID
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setDeletingId(id);
      try {
        await deleteScanById(id);
        setScans(scans.filter((scan) => scan.id !== id));
        Swal.fire("Deleted!", "The scan has been deleted.", "success");
      } catch (err) {
        setError("Failed to delete scan. Please try again.");
        console.error("Error deleting scan:", err);
        Swal.fire("Error!", "Failed to delete scan. Please try again.", "error");
      } finally {
        setDeletingId(null);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "text-green-500";
      case "FAILED":
        return "text-red-500";
      case "PENDING":
        return "text-yellow-500";
      case "RUNNING":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  useEffect(() => {
    fetchScans();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
    <div id="error-pages">
      <div className="error-page">
        <h1>Error {errorCode}</h1>
        <p>{error}</p>
        <button className="error-back-button" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
    );
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
                  <td className={getStatusColor(scan.status)}>{scan.status}</td>
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
                      disabled={deletingId === scan.id}
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
