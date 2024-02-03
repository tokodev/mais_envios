import * as xlsx from "xlsx";

export interface ExcelData {
  [key: string]: string | number | undefined;
}

export const readExcelBuffer = (buffer: Buffer): string[][] => {
  const workbook = xlsx.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const excelData = xlsx.utils.sheet_to_json(sheet, {
    header: 1,
  }) as string[][];

  return excelData;
};
