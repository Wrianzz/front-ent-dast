import React, { useState, useEffect } from "react";
import { startScan, getScanStatus } from "../api/apiService"; // Import fungsi API

const Tools: React.FC = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [scanId, setScanId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartScan = async () => {
    if (!name || !url) {
      alert("Please provide both name and URL");
      return;
    }

    setIsLoading(true);
    try {
      const data = await startScan(name, url); 
      setScanId(data.id); 
      setStatus("Pending");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!scanId) return;

    const interval = setInterval(async () => {
      try {
        const data = await getScanStatus(scanId);
        setStatus(data.status);

        if (data.status === "COMPLETED" || data.status === "FAILED") {
          clearInterval(interval);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred.";
        console.error(errorMessage);
        clearInterval(interval);
      }
    }, 2000); 

    return () => clearInterval(interval);
  }, [scanId]);

  const getStatusColor = () => {
    switch (status) {
      case "COMPLETED":
        return "text-green-500";
      case "FAILED":
        return "text-red-500";
      case "PENDING":
        return "text-yellow-500"
      case "RUNNING":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="scan-status">
      <h1 className="title">DAST URL Scanner</h1>

      {/* Input Nama */}
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter scan name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
      </div>

      {/* Input URL */}
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter URL to scan"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input-field"
        />
      </div>

      {/* Button untuk memulai scan */}
      <div className="button-container">
        <button
          onClick={handleStartScan}
          disabled={isLoading}
          className={`scan-button ${isLoading ? "disabled" : ""}`}
        >
          {isLoading ? "Scanning..." : "Start Scan"}
        </button>
      </div>

      {/* Menampilkan status */}
      {status && (
        <div className={`status ${getStatusColor()}`}>
          Status: {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      )}
    </div>
  );
};

export default Tools;
