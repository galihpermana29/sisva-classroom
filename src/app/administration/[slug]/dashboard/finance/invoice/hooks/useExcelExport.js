import { useCallback } from "react";
import * as XLSX from "xlsx";

/**
 * Custom hook to export data to an Excel file
 * @param {Array} rows - Array of data rows to be exported
 * @param {Array} headers - Array of headers for the Excel sheet
 * @param {string} filename - Name of the Excel file to be generated
 * @returns {Function} exportToExcel - Function to export data to Excel
 */
export const useExcelExport = (rows, headers, fileName = "Sheet.xlsx") => {
  const exportToExcel = useCallback(() => {
    if (!rows || rows.length === 0) {
      console.error("No data available to export.");
      return;
    }

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Tagihan");

    XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A1" });

    const allData = [headers, ...rows.map(Object.values)];

    const columnWidths = allData[0].map((_, colIndex) =>
      Math.max(
        ...allData.map((row) =>
          row[colIndex] ? row[colIndex].toString().length : 0
        )
      )
    );

    ws["!cols"] = columnWidths.map((width) => ({ width: width + 2 }));

    XLSX.writeFile(wb, fileName, { compression: true });
  }, [rows]);

  return exportToExcel;
};
