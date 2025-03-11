
import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const Certificate = ({ name }) => {
  const certRef = useRef(null);
  console.log(name);
  

  const generatePDF = () => {
    const input = certRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
      pdf.save("certificate.pdf");
    });
  };

  return (
    <div className="py-5">
      <div ref={certRef} style={{ width: "", padding: "20px", textAlign: "center", border: "2px solid black" }}>
        <h1>Certificate of Completion</h1>
        <h2>{name.name}</h2>
        <p>has successfully completed the course.</p>
        <p>🎉 Congratulations! 🎉</p>
      </div>
      <div className="pb-2"></div>
      <button className="p-1 border-transparent cursor-pointer bg-blue-500 border rounded-sm font-medium" onClick={generatePDF}>Download Certificate</button>
    </div>
  );
};

export default Certificate;
