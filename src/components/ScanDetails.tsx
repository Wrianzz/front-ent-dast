import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getScanWithTests, getTestDetails } from "../api/apiService";
import Loading from "./Loading";

interface ScanDetailsType {
  name: string;
  status: string;
  tests: string[];
}

interface TestDetails {
  id: string;
  request: string;
  response: string;
  scan_id: string;
  url: string;
  vuln_id: number;
}

const ScanDetails: React.FC = () => {
  const { id } = useParams(); // Ambil scan ID dari URL
  const navigate = useNavigate(); // Untuk navigasi kembali
  const [details, setDetails] = useState<ScanDetailsType | null>(null);
  const [tests, setTests] = useState<TestDetails[]>([]); // Menyimpan detail tes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Menyimpan error

  // Fungsi untuk memuat detail scan
  const fetchScanDetails = useCallback(async () => {
    try {
      if (!id) return;
      const data = await getScanWithTests(id); // Panggil API untuk detail scan
      setDetails(data);
  
      // Ambil detail untuk setiap testId
      const testDetails = await Promise.all(
        data.tests.map(async (testId: string) => {
          try {
            return await getTestDetails(testId);
          } catch (error) {
            console.error(`Error fetching details for test ID ${testId}:`, error);
            return null; // Abaikan error untuk test tertentu
          }
        })
      );
      setTests(testDetails.filter(Boolean) as TestDetails[]); // Hapus nilai null
    } catch (err) {
      setError("Failed to fetch scan details. Please try again later.");
      console.error("Error fetching scan details:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);
  
  useEffect(() => {
    fetchScanDetails();
  }, [fetchScanDetails]);  // Menggunakan fetchScanDetails di sini sebagai dependensi
  
  const getStatusColor = () => {
    switch (details?.status) {
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="back-button" onClick={() => navigate("/")}>
          Back to List
        </button>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="no-details-container">
        <p>No scan details found.</p>
        <button className="back-button" onClick={() => navigate("/")}>
          Back to List
        </button>
      </div>
    );
  }

  if (details.status === "FAILED") {
    return (
      <div className="scan-details">
      <h1>Scan Details</h1>
      <p>
        <strong>Name:</strong> {details.name}
      </p>
      <p>
        <strong>Status:</strong> <span className={getStatusColor()}>FAILED</span>
      </p>
      <h3>Vulnerability Found:</h3>
        <p>Scan Failed, No Vulnerability Found.</p>
      <button className="back-button" onClick={() => navigate("/list")}>
        Back to List
      </button>
      </div>
    );
  }

  return (
    <div className="scan-details">
      <h1>Scan Details</h1>
      <p>
        <strong>Name:</strong> {details.name}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span className={getStatusColor()}>{details.status}</span>
      </p>
      <h3>Vulnerability Found:</h3>
      {tests.length > 0 ? (
        <div>
          {tests.map((test) => (
            <div key={test.id} className="test-details">
              <p>
                <strong>Vulnerability ID:</strong> {test.vuln_id}
              </p>
              <p>
                <strong>Endpoint:</strong> {test.url}
              </p>
              <p>
                <strong>Request:</strong>
              </p>
              <pre>{test.request}</pre>
              <p>
                <strong>Response:</strong>
              </p>
              <pre className="scrollable">{test.response}</pre>
            </div>
          ))}
        </div>
      ) : (
        <p>No Vulnerability Found.</p>
      )}
      <button className="back-button" onClick={() => navigate("/list")}>
        Back to List
      </button>
      <button className="create-report-button">
        Create Report
      </button>
    </div>
  );
};
export default ScanDetails;
