import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet
} from "@react-pdf/renderer";

// Contoh jika ingin menggunakan font kustom (opsional)
// Font.register({
//   family: "Roboto",
//   src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu72xKOzY.woff2",
// });

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

interface ScanDetailsProps {
  name: string;
  status: string;
  tests: TestDetails[];
}

const PDFGenerator: React.FC<ScanDetailsProps> = ({ name, status, tests }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: "Helvetica", // Bisa diganti ke font custom
    },
    header: {
      borderBottom: "2px solid #007bff",
      marginBottom: 20,
      paddingBottom: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 12,
      color: "#555",
    },
    section: {
      marginBottom: 20,
    },
    tableHeader: {
      backgroundColor: "#007bff",
      color: "white",
      padding: 10,
      borderRadius: 4,
    },
    tableRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      borderBottom: "1px solid #ddd",
      marginBottom: 10,
    },
    rowLabel: {
      flex: 1,
      fontSize: 10,
      fontWeight: "bold",
    },
    rowContent: {
      flex: 2,
      fontSize: 10,
      wordWrap: "break-word",
    },
    testDetailsContainer: {
      marginBottom: 20,
    },
    testTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#007bff",
      marginBottom: 10,
    },
    codeBlock: {
      backgroundColor: "#f9f9f9",
      padding: 10,
      borderRadius: 4,
      fontSize: 10,
      fontFamily: "Courier",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
      marginTop: 10, 
      marginBottom:5,
    },
    footer: {
      position: "absolute",
      bottom: 20,
      left: 40,
      right: 40,
      fontSize: 10,
      textAlign: "center",
      color: "#555",
    },
    rowLabelReq: {
      flex: 1,
      fontSize: 10,
      fontWeight: "bold",
      marginTop: 12,
    },
    rowLabelRes: {
      flex: 1,
      fontSize: 10,
      fontWeight: "bold",
      marginTop:12,
    }
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Scan Report</Text>
          <Text style={styles.subtitle}>Generated on {new Date().toLocaleDateString()}</Text>
        </View>

        {/* General Details */}
        <View style={styles.section}>
          <Text style={styles.testTitle}>General Details</Text>
          <View style={styles.tableRow}>
            <Text style={styles.rowLabel}>Name:</Text>
            <Text style={styles.rowContent}>{name}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.rowLabel}>Status:</Text>
            <Text style={styles.rowContent}>{status}</Text>
          </View>
        </View>

        {/* Vulnerability Details */}
        <View style={styles.section}>
          <Text style={styles.testTitle}>Vulnerability Details</Text>
          {tests.length > 0 ? (
            tests.map((test, index) => (
              <View key={test.id} style={styles.testDetailsContainer}>
                <Text style={styles.testTitle}>Test {index + 1}</Text>
                <View style={styles.tableRow}>
                  <Text style={styles.rowLabel}>Description:</Text>
                  <Text style={styles.rowContent}>
                    {test.vulnerabilityDetails.description}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.rowLabel}>Severity:</Text>
                  <Text style={styles.rowContent}>
                    {test.vulnerabilityDetails.severity}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.rowLabel}>CVSS Vector:</Text>
                  <Text style={styles.rowContent}>
                    {test.vulnerabilityDetails.cvss_vector}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.rowLabel}>Endpoint:</Text>
                  <Text style={styles.rowContent}>{test.url}</Text>
                </View>
                <Text style={styles.rowLabel}>Request</Text>
                <Text style={styles.codeBlock}>{test.request}</Text>
                <Text style={styles.rowLabel}>Response</Text>
                <Text style={styles.codeBlock}>{test.response}</Text>
              </View>
            ))
          ) : (
            <Text>No vulnerabilities found</Text>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Page 1</Text> {/* Ubah sesuai dengan nomor halaman */}
          <Text>Generated by Team Menkrep</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFGenerator;
