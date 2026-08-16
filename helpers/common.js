
export class common {
    async readExcelData(worksheet, searchText) {
        const output = { row: -1, col: -1 };

        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNumber) => {
                if (cell.value === searchText) {
                    output.row = rowNumber;
                    output.col = colNumber;
                }
            });
        });

        return output;
    }

    async writeExcelData(searchText, writeText, change, filePath) {
        const ExcelJS = require('exceljs');
        const fs = require('fs');
        const path = require('path');
        const workbook = new ExcelJS.Workbook();

        const dir = path.dirname(filePath);
        fs.mkdirSync(dir, { recursive: true });

        if (!fs.existsSync(filePath)) {
            const worksheet = workbook.addWorksheet('Sheet1');
            worksheet.addRow(['Sample Data']);
            await workbook.xlsx.writeFile(filePath);
        }

        await workbook.xlsx.readFile(filePath);

        let worksheet = workbook.getWorksheet('Sheet1');
        if (!worksheet) {
            worksheet = workbook.addWorksheet('Sheet1');
        }

        const output = await this.readExcelData(worksheet, searchText);
        if (output.row === -1 || output.col === -1) {
            worksheet.addRow([searchText]);
            const newRow = worksheet.rowCount;
            const newCol = 1;
            output.row = newRow;
            output.col = newCol;
        }

        const cell = worksheet.getCell(output.row, output.col + change.colChange);
        cell.value = writeText;
        await workbook.xlsx.writeFile(filePath);
    }
}