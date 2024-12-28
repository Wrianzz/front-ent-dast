import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getScanWithTests, getTestDetails, getVulnDetails } from "../api/apiService";
import Loading from "./Loading";
import PDFGenerator from "./PDFGenerator";
import { PDFDownloadLink } from "@react-pdf/renderer";

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
  vulnerabilityDetails: {
    cvss_vector: string;
    description: string;
    severity: string;
    id: number;
  };
}

const ScanDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState<ScanDetailsType | null>(null);
  const [tests, setTests] = useState<TestDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  const fetchScanDetails = useCallback(async () => {
    try {
      if (!id) return;
      const data = await getScanWithTests(id);
      setDetails(data);

      const testDetails = await Promise.all(
        data.tests.map(async (testId: string) => {
          try {
            const testData = await getTestDetails(testId);
            if (testData.vuln_id) {
              const vulnerability = await getVulnDetails(testData.vuln_id.toString());
              return { ...testData, vulnerabilityDetails: vulnerability };
            }
            return testData;
          } catch (error) {
            console.error(`Error fetching details for test ID ${testId}:`, error);
            return null;
          }
        })
      );
      setTests(testDetails.filter(Boolean) as TestDetails[]);
      setError(null);
      setErrorCode(null);
    } catch (err: any) {
      console.error("Error fetching scan details:", err);
  
      const statusCode = err?.response?.status || err?.status || 500;
      switch (statusCode) {
          case 401:
              setError("Uh-oh! We have unauthorized user here. How about we go home? :)");
              setErrorCode(401);
              break;
          case 404:
              setError("Uh-oh! Scans not found. How about we go home?");
              setErrorCode(404);
              break;
          default:
              setError("Uh-oh! An unexpected error occurred. How about we go home?");
              setErrorCode(statusCode);
              break;
        }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchScanDetails();
  }, [fetchScanDetails]);

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

  return (
    <div className="scan-details">
      <h1>Scan Details</h1>
      <p>
        <strong>Name:</strong> {details.name}
      </p>
      <p>
        <strong>Status:</strong> <span className={getStatusColor()}>{details.status}</span>
      </p>
      <h3>Vulnerability Found:</h3>
      {tests.length > 0 ? (
        <div>
          {tests.map((test) => (
            <div key={test.id} className="test-details">
              {test.vulnerabilityDetails ? (
                <>
                  <p>
                    <strong>Vulnerability Description:</strong> {test.vulnerabilityDetails.description}
                  </p>
                  <p>
                    <strong>Severity:</strong> {test.vulnerabilityDetails.severity}
                  </p>
                  <p>
                    <strong>CVSS Vector:</strong> {test.vulnerabilityDetails.cvss_vector}
                  </p>
                </>
              ) : (
                <p>
                  <strong>Vulnerability:</strong> Not Found
                </p>
              )}
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
      <PDFDownloadLink
        document={<PDFGenerator name={details.name} status={details.status} tests={tests} />}
        fileName={details.name}
      >
        <button className="create-report-button">Create Report</button>
      </PDFDownloadLink>
    </div>
  );
};

export default ScanDetails;
