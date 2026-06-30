import { useState } from "react";
import SearchBar from "../components/SearchBar";
import PublicationTable from "../components/PublicationTable";
import "../App.css";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Dashboard() {
  const [data, setData] = useState([]);

  // ✅ FINAL FIXED PDF FUNCTION
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Research Portfolio Report", 20, 15);

    // If no data
    if (!data || data.length === 0) {
      doc.setFontSize(12);
      doc.text("No publications available", 20, 30);
    } else {

      // ✅ CLEAN TEXT FUNCTION (fix for weird symbols)
      const cleanText = (text) => {
        return text
          .replace(/[^\x00-\x7F]/g, "") // remove unicode
          .replace(/&/g, "and")         // replace &
          .replace(/</g, "")
          .replace(/>/g, "")
          .trim();
      };

      // ✅ FORMAT DATA
      const tableData = data.map((item, index) => [
        index + 1,
        cleanText(item),
      ]);

      // ✅ USE autoTable CORRECTLY
      autoTable(doc, {
        head: [["No", "Title"]],
        body: tableData,
        startY: 25,
        styles: {
          fontSize: 10,
          cellWidth: "wrap",
        },
        columnStyles: {
          1: { cellWidth: 150 }, // fix long titles
        },
      });
    }

    // Save PDF
    doc.save("research_data.pdf");
  };

  return (
    <div className="dashboard">

      {/* Title */}
      <div className="title">
        <h1>Research Portfolio Dashboard</h1>
      </div>

      {/* Card */}
      <div className="card">
        <SearchBar setData={setData} />

        {/* Table */}
        <PublicationTable data={data} />

        {/* Download Button */}
        <button className="download-btn" onClick={downloadPDF}>
          Download PDF
        </button>
      </div>

    </div>
  );
}

export default Dashboard;