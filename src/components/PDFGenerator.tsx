import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

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
      padding: "40px 40px 90px 40px", // Increased bottom padding
      fontFamily: "Helvetica",
      position: "relative",
      backgroundColor: "white",
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
      marginBottom: 5,
    },
    rowContent: {
      flex: 2,
      fontSize: 10,
    },
    testDetailsContainer: {
      marginBottom: 30,
      breakInside: "avoid",
    },
    testTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#007bff",
      marginBottom: 10,
      paddingTop: 10,
    },
    codeBlockWrapper: {
      marginTop: 10,
      marginBottom: 10,
    },
    codeBlockLabel: {
      fontSize: 10,
      fontWeight: "bold",
      marginBottom: 5,
    },
    codeBlock: {
      backgroundColor: "#f9f9f9",
      padding: 10,
      fontSize: 8, // Reduced font size
      fontFamily: "Courier",
      //minHeight: 40,
      width: "100%",
    },
    codeText: {
      fontSize: 8,
      lineHeight: 1.4,
    },
    footerContainer: {
      position: "absolute",
      bottom: 40,
      left: 0,
      right: 0,
      borderTop: "1px solid #ccc",
      backgroundColor: "white",
      paddingHorizontal: 40,
      paddingVertical: 10,
    },
    footerText: {
      fontSize: 10,
      color: "#555",
      textAlign: "center",
    },
    mainContent: {
      flexGrow: 1,
    }
  });

  const splitCodeText = (text: string) => {
    const maxCharsPerLine = 100;
    const lines: string[] = []; // Menambahkan tipe eksplisit string[]
    let currentLine = '';
  
    text.split('\n').forEach(line => {
      if (line.length <= maxCharsPerLine) {
        lines.push(line);
      } else {
        while (line.length > 0) {
          currentLine = line.slice(0, maxCharsPerLine);
          lines.push(currentLine);
          line = line.slice(maxCharsPerLine);
        }
      }
    });
  
    return lines.join('\n');
  };
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.mainContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Scan Report</Text>
            <Text style={styles.subtitle}>
              Generated on {new Date().toLocaleDateString()}
            </Text>
          </View>

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

          <View style={styles.section}>
            <Text style={styles.testTitle}>Vulnerability Details</Text>
            {tests.map((test, index) => (
              <View key={test.id} wrap={true}>
                <View style={styles.testDetailsContainer}>
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
                </View>

                {/* Request Block */}
                <View style={styles.codeBlockWrapper} wrap={true}>
                  <Text style={styles.codeBlockLabel}>Request</Text>
                  <View style={styles.codeBlock}>
                    <Text style={styles.codeText}>
                      {splitCodeText(test.request)}
                    </Text>
                  </View>
                </View>

                {/* Response Block */}
                <View style={styles.codeBlockWrapper} wrap={true}>
                  <Text style={styles.codeBlockLabel}>Response</Text>
                  <View style={styles.codeBlock}>
                    <Text style={styles.codeText}>
                      {splitCodeText(test.response)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footerContainer} fixed>
          <Text style={styles.footerText} render={({ pageNumber, totalPages }) => (
            `Page ${pageNumber} of ${totalPages}`
          )} />
          <Text style={styles.footerText}>Generated by Team Menkrep</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFGenerator;